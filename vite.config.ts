import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vitest/config'
import adapter from '@sveltejs/adapter-cloudflare'
import { sveltekit } from '@sveltejs/kit/vite'
import { aot } from 'elysia/plugin/aot/vite'

const aotPlugin = aot('src/lib/server/api/index.ts', { target: 'workerd' })

// Elysia AOT precompiles handlers + schemas at build time (workerd forbids
// `new Function`). Needs Bun (`bunx --bun vite build`). Skipped for the
// client build, which never imports the server API.
const elysiaAot = {
	...aotPlugin,
	buildStart(this: { environment: { name: string } }) {
		if (this.environment.name === 'client') return
		return aotPlugin.buildStart()
	},
	buildEnd(this: { environment: { name: string } }) {
		if (this.environment.name === 'client') return
		return aotPlugin.buildEnd()
	},
}

export default defineConfig({
	plugins: [tailwindcss(), sveltekit({ adapter: adapter() }), elysiaAot],
	test: {
		expect: { requireAssertions: true },
		environment: 'node',
		include: ['src/**/*.{test,spec}.{js,ts}'],
	},
})
