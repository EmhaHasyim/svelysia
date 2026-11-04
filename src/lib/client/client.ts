import { treaty } from '@elysia/eden'
import type { App } from '#lib/server/api/index.ts'

// Elysia owns the /api prefix, so client paths nest under `.api`
// and requests stay relative (`/api/health`) thanks to keepDomain.
// ponytail: parseDate default false on empty base — skip Date parsing overhead. Ceiling: dates arrive as strings; upgrade: parseDate:true if API returns dates.
export const eden = treaty<App>('', { keepDomain: true })
