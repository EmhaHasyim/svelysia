import { Elysia, t } from 'elysia'
import { openapi } from '@elysia/openapi'
import pkg from '../../../../package.json' with { type: 'json' }

// API mounted under /api by the SvelteKit boundary route. Add routes here.
export const app = new Elysia({ name: 'api', prefix: '/api', precompile: true })
	.use(
		openapi({
			documentation: { info: { title: 'Svelysia API', version: pkg.version } },
		}),
	)
	// Security headers for dynamic API responses — `_headers` only covers
	// static assets, so set them on the app itself.
	// onAfterHandle has access to `set`; onAfterResponse does not.
	.onAfterHandle(({ set }) => {
		set.headers['X-Content-Type-Options'] = 'nosniff'
		set.headers['X-Frame-Options'] = 'DENY'
		set.headers['Referrer-Policy'] = 'strict-origin-when-cross-origin'
	})
	.get(
		'/health',
		{
			detail: { summary: 'Health check' },
			response: t.Object({ status: t.Literal('ok'), version: t.String() }),
		},
		() => ({ status: 'ok' as const, version: pkg.version }),
	)

export type App = typeof app

export default app
