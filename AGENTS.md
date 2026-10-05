# AGENTS.md

Project: **svelysia** — SvelteKit + Elysia on Cloudflare Workers, Tailwind 4.
Bun 1.4.2 is the only toolchain: `bun install`, `bunx`, `bun run`. Never `npm`/`pnpm`/`yarn`/`npx`.

## Workflow (mandatory)

1. Edit the code.
2. Lint + format — **both, every time, before you report done**: `bun run lint`, `bun run format`.
   If either fails, fix it. `oxfmt` decides formatting; do not hand-tune.
3. Typecheck when types changed: `bun run check`.
4. Before commit: `bun run verify` — the exact gate CI runs on every PR to `main`.
   A local shortcut is a failed PR.

Never report done with failing lint/format. Never disable an oxlint rule to silence a warning —
fix the code, or add a justified `// oxlint-disable-next-line` with a reason.

## API contract

Elysia is the single source of truth, mounted at `/api` and forwarded by
`src/routes/api/[...slugs]/+server.ts`:

- **Add/modify API routes only in `src/lib/server/api/index.ts`.** Never hand-write a handler
  under `src/routes/api/` — the catch-all would shadow it.
- Types flow automatically: `export type App = typeof app`, and `src/lib/api/client.ts` derives
  from it. Don't hand-write response types on the client.
- Define request/response with `t.*` so validation and client types stay in sync. Elysia 2 returns
  RFC 9457 `application/problem+json` on error — `src/routes/api/api.spec.ts` asserts on that.

## Rules

- **Ponytail ultra** (ladder inherited from the parent `AGENTS.md`): YAGNI, reuse before writing,
  stdlib first, no new dependency, fewest files, shortest working diff. Say it out loud when
  building something a stdlib/native feature already covers. Mark deliberate shortcuts with a
  `// ponytail:` comment naming the ceiling and the upgrade path.
- Bug fix = fix the shared root cause. Grep every caller of what you touch.
- No `new Function`/eval in route bodies — `bun run build` AOT-precompiles Elysia and the build fails.
- Leave one runnable check for non-trivial logic (vitest, `src/routes/api/api.spec.ts` pattern).
  Trivial one-liners need no test.
- TypeScript 6, strict. No `any` unless a comment says why. Comments in English only.
- `oxfmt` does **not** format `.svelte` files. Hand-match `<script>` blocks to `.oxfmtrc.json`:
  tabs, single quotes, no semicolons, width 100.
- `src/app.html` and UI copy are Bahasa Indonesia on purpose. Leave `lang="id"` and the Indonesian
  strings alone.
- Secrets/env: Workers bindings only, never inline. After touching `wrangler.jsonc`, run `bun run gen`.
- Keep the bun pin in sync wherever it appears (`.npmrc`, `package.json`, CI `bun-version`).
  All three currently read 1.4.2.
- Project name lives in two places and must match: `package.json` `name` and `wrangler.jsonc`
  `name` (the Worker name, and the `workers.dev` subdomain). Change both on every new site.

## Don't touch

- `worker-configuration.d.ts` (generated, gitignored — `bun run check` and `bun run build` both run
  `wrangler types` first, so a fresh clone typechecks without a manual `bun run gen`), `.svelte-kit/`,
  `bun.lock`, `.wrangler/`.
- `elysia` and `@elysia/eden` are **exact pins** on the 2.0.0 beta line. `2.0.0-beta.19` breaks the
  AOT build with `handler JIT is still reachable`; beta.20 does not. Bump deliberately, then
  `bun run verify`.
