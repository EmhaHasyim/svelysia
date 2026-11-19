import { describe, expect, test } from 'vitest'
import pkg from '../../../../package.json' with { type: 'json' }
import { fallback } from './+server.ts'

describe('API route boundary', () => {
	test('GET /api/health reaches Elysia', async () => {
		const response = await fallback({ request: new Request('http://localhost/api/health') })

		expect(response.status).toBe(200)
		const body = (await response.json()) as { status: string; version: string }
		expect(body.status).toBe('ok')
		expect(body.version).toBe(pkg.version)
		// Security headers set by onAfterHandle must survive on dynamic responses.
		expect(response.headers.get('X-Content-Type-Options')).toBe('nosniff')
		expect(response.headers.get('X-Frame-Options')).toBe('DENY')
		expect(response.headers.get('Referrer-Policy')).toBe('strict-origin-when-cross-origin')
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
