import { Elysia, t } from 'elysia'

export const health = new Elysia({ name: 'module.health', prefix: '/health' }).get(
	'/',
	{ response: t.Object({ status: t.Literal('ok') }) },
	() => ({ status: 'ok' as const }),
)
