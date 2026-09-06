import { browser } from '$app/environment'
import { treaty } from '@elysia/eden'
import type { App } from '$lib/server/api'

/**
 * End-to-end type-safe API client (Eden Treaty) for the browser.
 * Types are shared straight from `src/lib/server/api` via `import type`,
 * so the server module itself is never bundled into client code.
 */
const origin = browser ? location.origin : 'http://localhost:5173'

export const api = treaty<App>(`${origin}/api`)
