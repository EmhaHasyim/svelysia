import { treaty } from '@elysia/eden'
import type { App } from '$lib/server/api'

/**
 * End-to-end type-safe API client (Eden Treaty) for the browser.
 * Types are shared straight from `src/lib/server/api` via `import type`,
 * so the server module itself is never bundled into client code.
 */
const origin = typeof location === 'undefined' ? 'http://localhost:5173' : location.origin

export const api = treaty<App>(`${origin}/api`)
