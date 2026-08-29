import { expect, test, vi } from 'vitest'
import { page } from 'vitest/browser'
import { render } from 'vitest-browser-svelte'
import Page from './+page.svelte'

test('landing page checks the API successfully', async () => {
	await render(Page)

	await expect.element(page.getByRole('link', { name: /Svelysia/ })).toBeVisible()
	const checkApi = page.getByRole('button', { name: 'Check API' })
	await expect.element(checkApi).toBeVisible()
	await checkApi.click()
	await expect.element(page.getByText('Operational', { exact: true })).toBeVisible()
})

test('landing page shows an unavailable state when the API fails', async () => {
	vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new Error('network failure'))

	await render(Page)
	await page.getByRole('button', { name: 'Check API' }).click()

	await expect.element(page.getByText('Unavailable', { exact: true })).toBeVisible()
})
