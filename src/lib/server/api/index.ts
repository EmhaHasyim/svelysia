import { Elysia } from 'elysia'
import { health } from './modules/health'

/** Main Elysia API mounted under /api by the SvelteKit API boundary route. */
export const app = new Elysia({ name: 'api' }).use(health)

export type App = typeof app
