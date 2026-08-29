# Svelysia

Svelysia adalah template starter minimal untuk membangun website baru tanpa mengulang setup dari awal. Template ini menyediakan fondasi SvelteKit, API Elysia, UI Tailwind/shadcn-svelte, testing, formatting, dan linting yang siap dikembangkan.

## Tech stack

- SvelteKit 2 dengan Svelte 5 runes
- TypeScript strict
- Cloudflare Workers melalui `@sveltejs/adapter-cloudflare`
- Elysia 2 beta untuk API
- Eden Treaty untuk client API type-safe
- Tailwind CSS 4
- shadcn-svelte untuk komponen UI opsional
- Vitest untuk server dan browser tests
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

Halaman utama menjelaskan tujuan template dan menyediakan contoh interaksi minimal dengan endpoint `GET /health` dari Elysia.

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

Jalankan seluruh pemeriksaan sebelum memakai template atau mengirim perubahan:

```sh
bun run check
bun run lint
bun run format:check
bun test --run --project server
bun run build
```

Atau jalankan seluruh quality gate sekaligus. Command ini membersihkan artifact generated terlebih dahulu:

```sh
bun run verify
```

Untuk perubahan UI, jalankan browser test jika executable Chromium Playwright tersedia.

## Mulai project baru

Setelah menyalin atau membuat repository dari template ini:

1. Ubah metadata project di `package.json`.
2. Ganti halaman utama di `src/routes/+page.svelte`.
3. Tambahkan domain API baru di `src/lib/server/api/modules`.
4. Pertahankan `App = typeof app` agar Eden Treaty tetap type-safe.
5. Tambahkan komponen shadcn-svelte hanya saat benar-benar dibutuhkan:
   ```sh
   bunx shadcn-svelte@latest add button
   ```
6. Jalankan seluruh validation command.

API bawaan hanya berisi health check agar template tetap ringan. Persistence, autentikasi, database, dan domain API sengaja tidak disertakan karena berbeda untuk setiap website.
