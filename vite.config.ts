import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vitest/config'
import adapter from '@sveltejs/adapter-cloudflare'
import { sveltekit } from '@sveltejs/kit/vite'
import { aot } from 'elysia/plugin/aot/vite'

// Elysia AOT precompiles handlers + schemas at build time (workerd forbids
// `new Function`). Needs Bun (`bunx --bun vite build`). Scoped to non-client
// environments: the client build never imports the server API, and the plugin's
// `buildEnd` throws when its entry misses the module graph.
const elysiaAot = {
	...aot('src/lib/server/api/index.ts', { target: 'workerd' }),
	applyToEnvironment: (environment: { name: string }) => environment.name !== 'client',
}

export default defineConfig({
	plugins: [tailwindcss(), sveltekit({ adapter: adapter() }), elysiaAot],
	test: {
		expect: { requireAssertions: true },
		environment: 'node',
		include: ['src/**/*.{test,spec}.{js,ts}'],
	},
})
