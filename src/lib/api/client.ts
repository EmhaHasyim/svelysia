import { treaty } from '@elysia/eden'
import type { App } from '$lib/server/api'

// Elysia owns the /api prefix, so client paths nest under `.api`
// and requests stay relative (`/api/health`) thanks to keepDomain.
export const eden = treaty<App>('', { keepDomain: true })
