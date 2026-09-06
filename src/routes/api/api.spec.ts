import { describe, expect, test } from 'vitest'
import { fallback } from './[...slugs]/+server'

describe('API route boundary', () => {
	test('GET /api/health reaches Elysia', async () => {
		const response = await fallback({ request: new Request('http://localhost/api/health') })

		expect(response.status).toBe(200)
		expect(await response.json()).toEqual({ status: 'ok' })
	})

	test('returns RFC 9457 Problem Details for an unknown API endpoint', async () => {
		const response = await fallback({ request: new Request('http://localhost/api/missing') })

		expect(response.status).toBe(404)
		expect(response.headers.get('content-type')).toBe('application/problem+json')
		expect(await response.json()).toMatchObject({
			type: 'not-found',
			title: 'Not Found',
			status: 404,
		})
	})
})
