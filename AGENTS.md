# AGENTS.md

All code must be correct, type-safe, consistent, efficient, performant, and maintainable.

## General Rules

- Follow the existing code style, structure, and patterns.
- Follow idiomatic best practices of the tech stack being used.
- If project conventions conflict with general best practices, follow the existing project first.
- Write clean, readable, and simple code.
- Use strict types whenever possible.
- Do not use `any`, implicit `any`, unsafe casts, or `@ts-ignore`.
- Validate all external input.
- Handle errors and edge cases properly.
- Avoid unnecessary complexity, duplication, and dependencies.
- Write efficient code without premature optimization.
- Avoid unnecessary loops, repeated computations, excessive queries, and unnecessary re-renders.
- Remove unused imports, variables, functions, and dead code.
- Keep changes focused and do not break existing behavior.
- If requirements are unclear, ask instead of guessing.

## Project Stack

This is a SvelteKit 2 application using:

- Svelte 5 runes
- TypeScript in strict mode
- Cloudflare Workers and `@sveltejs/adapter-cloudflare`
- Elysia 2 beta
- Eden Treaty
- Vitest with server and browser projects
- Oxlint
- Oxfmt

## Package Manager

This project uses **Bun** as its package manager and script runner.

- Use `bun install` to install dependencies.
- Use `bun add` and `bun remove` to manage dependencies.
- Run scripts with `bun run <script>`.
- Run tests with `bun test` or `bun test --run --project server`.
- Do not use npm, pnpm, or yarn for installation or scripts.
- Do not create or update `package-lock.json`, `pnpm-lock.yaml`, or `yarn.lock`.
- Keep `bun.lock` updated when dependencies change.

## TypeScript and Type Safety

- Preserve strict TypeScript settings in `tsconfig.json`.
- Prefer accurate types, type guards, generics, `unknown`, and schema-derived types.
- Use `import type` for type-only imports.
- Do not weaken compiler settings to hide application errors.
- Keep `.svelte-kit/**`, `.wrangler/**`, and other generated output excluded from source checks.
- Never edit generated files manually.

## SvelteKit and Svelte 5

- Use Svelte 5 runes syntax consistently with the existing code.
- Follow SvelteKit route conventions such as `+page.ts`, `+page.svelte`, and `+server.ts`.
- Keep browser-only code out of server modules.
- Preserve SSR safety; do not access browser globals during server evaluation.
- Use the existing Cloudflare adapter and Worker-compatible Web APIs.

## Elysia and Eden

- Keep API modules separated by domain and compose them with `.use(...)`.
- Preserve the Elysia 2 beta route signature and existing API architecture.
- Define request, parameter, and response schemas with Elysia `t` schemas.
- Keep `App = typeof app` available for Eden Treaty type inference.
- Use typed Elysia errors or the project error mapping instead of unstructured errors.
- Keep validation and serialization behavior covered by tests.
- Do not introduce Node-only APIs such as `fs`, `path`, `Buffer`, or unrestricted `process` usage into Worker request paths.

## Formatting and Linting

- Use Oxfmt for formatting; do not manually fight formatter output.
- Use Oxlint for linting and fix real issues instead of broadly disabling rules.
- Keep `bun run lint` warning-free; `--deny-warnings` is intentional.
- Add narrow rule overrides only when a rule conflicts with an official framework convention or deliberate project pattern.
- Do not disable Oxlint `correctness` or `suspicious` categories globally.
- Keep generated output, dependencies, build artifacts, and ignored assets excluded from lint and format.

## Tests and Validation

Before considering a change complete, run the relevant checks:

```bash
bun run check
bun run lint
bun run format:check
bun test --run --project server
bun run build
# Or run the complete cross-platform quality gate:
bun run verify
```

For UI changes, also run the client/browser test project when the Playwright browser executable is available.

Add or update tests for behavior changes, especially API validation, error handling, serialization, and integration boundaries.

If a check cannot run, report the exact command, failure, and environment limitation instead of claiming success.

## Change Discipline

- Inspect existing files and conventions before editing.
- Prefer the smallest change that solves the request.
- Prefer editing existing files over creating new abstractions or files.
- Do not change unrelated code, configuration, or dependencies.
- Do not overwrite, discard, stash, or stage changes made by the user or another agent.
- Do not commit, push, deploy, or open a pull request unless explicitly requested.
- Explain important trade-offs and validation results clearly.
