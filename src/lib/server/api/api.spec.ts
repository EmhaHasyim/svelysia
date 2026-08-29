import { treaty } from '@elysia/eden'
import { describe, expect, test } from 'vitest'
import { app } from './index'

const client = treaty(app)

describe('GET /health', () => {
	test('returns ok', async () => {
		const { data, error } = await client.health.get()

		expect(error).toBeNull()
		expect(data?.status).toBe('ok')
	})
})
