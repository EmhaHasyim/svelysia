import { app } from '$lib/server/api'

type RequestHandler = (v: { request: Request }) => Response | Promise<Response>

// SvelteKit catch-all: forward every non-page request (any HTTP method) to Elysia.
export const fallback: RequestHandler = ({ request }) => app.handle(request)
