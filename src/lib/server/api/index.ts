import { Elysia, t } from 'elysia'
import { openapi } from '@elysia/openapi'

// API mounted under /api by the SvelteKit boundary route. Add routes here.
export const app = new Elysia({ name: 'api', prefix: '/api', precompile: true })
	.use(openapi({ documentation: { info: { title: 'Svelysia API', version: '0.0.1' } } }))
	.get(
		'/health',
		{
			detail: { summary: 'Health check' },
			response: t.Object({ status: t.Literal('ok'), version: t.String() }),
		},
		() => ({ status: 'ok' as const, version: '0.0.1' }),
	)

export type App = typeof app

export default app
