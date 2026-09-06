import { app } from '$lib/server/api'

export const fallback = ({ request }: { request: Request }) =>
	app.handle(new Request(request.url.replace('/api/', '/'), request))
