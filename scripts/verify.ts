import { spawnSync } from 'node:child_process'
import { rmSync } from 'node:fs'

// Cleanup runs first so every later check sees a fresh generated tree.
const generatedDirectories = ['.svelte-kit', '.wrangler', 'build', 'coverage']

for (const directory of generatedDirectories) {
	try {
		rmSync(directory, { force: true, recursive: true })
	} catch (error) {
		if (!isBusyError(error)) throw error
		console.warn(`Skipping locked generated directory: ${directory}`)
	}
}

function isBusyError(error: unknown): boolean {
	return error instanceof Error && 'code' in error && error.code === 'EBUSY'
}

const commands = [
	// Regenerate Cloudflare types before any check that depends on them.
	['bun', ['run', 'gen']],
	['bun', ['run', 'check']],
	['bun', ['run', 'lint']],
	['bun', ['run', 'format:check']],
	['bun', ['test', '--run', '--project', 'server']],
	['bun', ['run', 'build']],
] as const

for (const [command, args] of commands) {
	const result = spawnSync(command, args, { stdio: 'inherit', shell: process.platform === 'win32' })
	if (result.error) throw result.error
	if (result.status !== 0) process.exit(result.status ?? 1)
}
