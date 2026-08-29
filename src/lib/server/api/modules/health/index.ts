import { Elysia } from 'elysia'

export const health = new Elysia({ name: 'module.health', prefix: '/health' }).get('/', () => ({
	status: 'ok' as const,
}))
