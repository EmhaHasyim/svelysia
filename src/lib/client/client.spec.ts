import { afterEach, describe, expect, test, vi } from 'vitest'
import { eden } from './client.ts'

describe('Eden client', () => {
	afterEach(() => {
		vi.unstubAllGlobals()
	})

	test('calls GET /api/health on the current origin', async () => {
		const fetcher = vi.fn<(url: string, init?: RequestInit) => Promise<Response>>(
			async () =>
				new Response(JSON.stringify({ status: 'ok', version: '0.0.1' }), {
					headers: { 'content-type': 'application/json' },
				}),
		)
		vi.stubGlobal('fetch', fetcher)

		const { data, error } = await eden.api.health.get()

		expect(error).toBeNull()
		expect(data).toEqual({ status: 'ok', version: '0.0.1' })
		// Relative URL: the browser resolves it against the page origin, so the
		// request stays same-origin and needs no CORS. Dropping keepDomain
		// would turn this into an absolute https:// URL and break that.
		expect(fetcher).toHaveBeenCalledWith('/api/health', expect.anything())
	})
})
