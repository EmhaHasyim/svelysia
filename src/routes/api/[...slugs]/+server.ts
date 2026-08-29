import { app } from '$lib/server/api'

type RequestHandler = (v: { request: Request }) => Response | Promise<Response>

// Keep the API boundary explicit: only /api/* is handled by Elysia.
export const fallback: RequestHandler = ({ request }) => {
	const url = new URL(request.url)
	url.pathname = url.pathname.replace(/^\/api(?=\/|$)/, '') || '/'

	return app.handle(new Request(url, request))
}
