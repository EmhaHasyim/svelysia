import { describe, expect, test } from 'vitest'
import { fallback } from './[...slugs]/+server'

describe('API route boundary', () => {
	test('GET /api/health reaches Elysia', async () => {
		const response = await fallback({
			request: new Request('http://localhost/api/health'),
		})

		expect(response.status).toBe(200)
		expect(await response.json()).toEqual({ status: 'ok' })
	})

	test('preserves the query string while forwarding to Elysia', async () => {
		const response = await fallback({
			request: new Request('http://localhost/api/health?probe=true'),
		})

		expect(response.status).toBe(200)
	})

	test('returns 404 for an unknown API endpoint', async () => {
		const response = await fallback({
			request: new Request('http://localhost/api/missing'),
		})

		expect(response.status).toBe(404)
	})

	test('returns 404 for an unsupported method', async () => {
		const response = await fallback({
			request: new Request('http://localhost/api/health', { method: 'POST' }),
		})

		expect(response.status).toBe(404)
	})
})
