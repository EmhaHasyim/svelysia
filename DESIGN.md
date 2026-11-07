# Design System — Svelysia

Sumber: Adaptasi dari design system "sua" (local-first agent playground),
dimodifikasi untuk techstack template SvelteKit 3 + Elysia 2 RC + Cloudflare Workers.

Warna resmi:

- SvelteKit / svelte.dev — Vermilion `#ff3e00`, hover `#e63600`, soft `#fff1ec`, neutral
  `#ffffff` / `#fafafa` / `#e5e5e5`, text `#15191e`
- Elysia / elysiajs.com — Magenta `#ec82b0` (+ `#fef8f1`, `#ffffff`), accent sekunder

## Color

### Light Mode

- Background `#ffffff`, Surface kaca `rgba(255,255,255,0.6)`, Surface raised `rgba(250,250,250,0.55)`
- Border `rgba(0,0,0,0.08)`, Border strong `rgba(0,0,0,0.14)`
- Text `#15191e`, Text muted `#5b5b5b`, Text subtle `#8c8c8c`
- Primary Vermilion `#ff3e00`, hover `#e63600`, soft `#fff1ec`
- Accent Magenta `#ec82b0` (tidak untuk CTA)
- Success `#4ade80` (hanya untuk status sukses)
- Terminal bg `rgba(21,25,30,0.9)`, fg `#f4f4f4`
- Status: warn `#fbbf24`, danger `#f87171`, idle `#a3a3a3`
- Glass `rgba(255,255,255,0.82)`, glass border `rgba(0,0,0,0.08)`, shadow `0 8px 32px rgba(0,0,0,0.1)`
- Glow `radial-gradient(ellipse 80% 50% at 50% -20%, rgba(255,62,0,0.12), transparent)`

### Dark Mode (default)

- Background `#14161a`, Surface kaca `rgba(29,32,38,0.55)`, Surface raised `rgba(38,42,51,0.55)`
- Border `rgba(255,255,255,0.08)`, Border strong `rgba(255,255,255,0.14)`
- Text `#f4f4f4`, Text muted `#a8a29e`, Text subtle `#8c8c8c`
- Primary Vermilion `#ff3e00`, hover `#ff5c26`
- Accent Magenta `#ff99c2`
- Success `#4ade80`
- Terminal bg `rgba(12,13,16,0.85)`, fg `#e5e5e5`
- Status: warn `#fbbf24`, danger `#f87171`, idle `#737373`
- Glass `rgba(29,32,38,0.78)`, glass border `rgba(255,255,255,0.10)`, shadow `0 8px 32px rgba(0,0,0,0.35)`
- Glow `radial-gradient(ellipse 80% 50% at 50% -20%, rgba(255,62,0,0.18), transparent)`

## Typography

- Display/Headings: Space Grotesk 500–700 (brand face, dipakai di `h1/h2/h3` + `.font-display`)
- Body: system sans (`system-ui`), tanpa custom font body
- Labels: JetBrains Mono 600, tracking 0.08em (sentence case, tanpa ALL-CAPS paksa)
- Code/Data: JetBrains Mono 400

> Revisi 2026-11-07: Display berubah dari JetBrains Mono ke Space Grotesk agar
> heading tidak terasa seperti terminal; mono tetap dipakai untuk labels & code.

## Layout

- Max width 1024px (`max-w-5xl`), topbar 64px sticky glass
- Kartu: `backdrop-blur-md`, `box-shadow: var(--shadow-glass)`, border glass
- Panel terminal/code: `backdrop-blur-xl`
- Header "Mulai cepat" tampil di semua breakpoint (tidak disembunyikan di mobile)

## Motion

- Minimal-functional, micro 150–200ms hover, short reveal 600ms. Tanpa bounce/spring.
- Reveal `[data-reveal]` hanya disembunyikan saat JS aktif (kelas `.js` di `<html>`);
  tanpa JS konten tetap terlihat.

## Dark Mode

- Default dark, toggle di header, disimpan di localStorage, cegah flash via script di `app.html`

## Voice

- Bahasa Indonesia natural, tekankan outcome bukan arsitektur

## Decisions Log

| Date       | Decision                                                               | Rationale                                                                                     |
| ---------- | ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| 2026-11-04 | Vermilion `#ff3e00` (Svelte) + Magenta `#ec82b0` (Elysia)              | Identitas resmi kedua proyek; bukan hijau/teal                                                |
| 2026-11-04 | Glass morphism                                                         | Modern tanpa berat; pakai backdrop-blur + token glass                                         |
| 2026-11-04 | Dark default + toggle                                                  |
| 2026-11-07 | Space Grotesk untuk display; Success hijau dipisah dari Accent magenta | Heading yang bersih tapi tetap punya identitas; status sukses tak tertukar dengan aksen brand |
| 2026-11-07 | Glass opacity dinaikkan (0.78 dark, 0.82 light)                        | Mengurangi ghosting teks di balik header sticky                                               |
