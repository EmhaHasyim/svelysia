import { app } from '#lib/server/api/index.ts'

export const fallback = ({ request }: { request: Request }) => app.handle(request)
