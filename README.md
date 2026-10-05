# Svelysia

Svelysia adalah template starter minimal untuk membangun website baru tanpa mengulang setup dari awal. Template ini menyediakan fondasi SvelteKit, API Elysia, UI Tailwind, testing, formatting, dan linting yang siap dikembangkan.

## Tech stack

- SvelteKit 2 dengan Svelte 5 runes
- TypeScript strict
- Cloudflare Workers melalui `@sveltejs/adapter-cloudflare`
- Elysia 2 beta untuk API
- Eden Treaty untuk client API type-safe
- Tailwind CSS 4
- Vitest untuk server tests
- Oxlint dan Oxfmt untuk quality checks
- Bun sebagai package manager dan script runner

## Setup

Install dependencies dengan Bun:

```sh
bun install
```

## Development

Jalankan development server:

```sh
bun run dev
```

Untuk membuka browser otomatis:

```sh
bun run dev -- --open
```

Halaman utama menjelaskan tujuan template dan menyediakan contoh interaksi minimal dengan endpoint `GET /api/health` dari Elysia.

## Build dan preview

Buat production build untuk Cloudflare Workers:

```sh
bun run build
```

Preview hasil build:

```sh
bun run preview
```

## Validation

Jalankan seluruh quality gate sekaligus:

```sh
bun run verify
```

## Mulai project baru

Buat repository baru dari template ini lewat tombol **Use this template** di halaman GitHub, lalu:

1. Ganti `name` di `package.json` dan di `wrangler.jsonc` dengan nama project yang sama. Nilai di `wrangler.jsonc` menjadi nama Worker dan subdomain `workers.dev`.
2. Ganti halaman utama di `src/routes/+page.svelte`.
3. Tambahkan endpoint API baru di `src/lib/server/api/index.ts`; semua endpoint API diekspos di bawah prefix `/api`. Client browser type-safe tersedia di `src/lib/api/client.ts` dan mengikuti tipe server otomatis.
4. Jalankan `bun install && bun run verify`.

`worker-configuration.d.ts` tidak ikut ter-track; `bun run check` dan `bun run build` menjalankan `wrangler types` sendiri sehingga tipe Workers binding selalu sinkron dengan `wrangler.jsonc`.

API bawaan hanya berisi health check agar template tetap ringan. Persistence, autentikasi, database, dan domain API sengaja tidak disertakan karena berbeda untuk setiap website.
