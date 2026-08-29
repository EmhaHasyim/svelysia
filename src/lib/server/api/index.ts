import { Elysia } from 'elysia'
import { health } from './modules/health'

/** Main Elysia API mounted into SvelteKit through the catch-all server route. */
export const app = new Elysia({ name: 'api' }).use(health)

export type App = typeof app
