import { app } from '$lib/server/api'

export const fallback = ({ request }: { request: Request }) => app.handle(request)
