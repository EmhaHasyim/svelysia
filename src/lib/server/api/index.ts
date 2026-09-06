import { Elysia, t } from 'elysia'

/** API mounted under /api by the SvelteKit boundary route. Add routes here. */
export const app = new Elysia({ name: 'api' }).get(
	'/health',
	{
		response: t.Object({ status: t.Literal('ok') }),
	},
	() => ({ status: 'ok' as const }),
)

export type App = typeof app
