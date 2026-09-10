import { treaty } from '@elysia/eden'
import type { App } from '$lib/server/api'

// Elysia memilik prefix /api, jadi path client bersarang di bawah `.api`
// dan request tetap relatif (`/api/health`) berkat keepDomain.
export const eden = treaty<App>('', { keepDomain: true })
