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
- Terminal bg `rgba(21,25,30,0.85)`, fg `#f4f4f4`
- Status: warn `#fbbf24`, danger `#f87171`, idle `#a3a3a3`
- Glass `rgba(255,255,255,0.55)`, glass border `rgba(255,255,255,0.6)`, shadow `0 8px 32px rgba(0,0,0,0.08)`
- Glow `radial-gradient(ellipse 80% 50% at 50% -20%, rgba(255,62,0,0.12), transparent)`

### Dark Mode (default)

- Background `#14161a`, Surface kaca `rgba(29,32,38,0.55)`, Surface raised `rgba(38,42,51,0.55)`
- Border `rgba(255,255,255,0.08)`, Border strong `rgba(255,255,255,0.14)`
- Text `#f4f4f4`, Text muted `#a8a29e`, Text subtle `#8c8c8c`
- Primary Vermilion `#ff5c26`, hover `#ff7a4d`
- Accent Magenta `#ff99c2`
- Terminal bg `rgba(12,13,16,0.7)`, fg `#e5e5e5`
- Status: warn `#fbbf24`, danger `#f87171`, idle `#525252`
- Glass `rgba(29,32,38,0.45)`, glass border `rgba(255,255,255,0.10)`, shadow `0 8px 32px rgba(0,0,0,0.4)`
- Glow `radial-gradient(ellipse 80% 50% at 50% -20%, rgba(255,92,38,0.18), transparent)`

## Typography

- Display/Headings: JetBrains Mono 700 (monospace adalah merek)
- Body: system sans (`system-ui`), tanpa custom font body
- Labels: JetBrains Mono 600, uppercase, tracking 0.08em
- Code/Data: JetBrains Mono 400

## Layout

- Max width 1024px (`max-w-5xl`), topbar 64px sticky glass
- Kartu: `backdrop-blur-md`, `box-shadow: var(--shadow-glass)`, border glass
- Panel terminal/code: `backdrop-blur-xl`

## Motion

- Minimal-functional, micro 50–100ms hover, short 150–200ms. Tanpa bounce/spring.

## Dark Mode

- Default dark, toggle di header, disimpan di localStorage, cegah flash via script di `app.html`

## Voice

- Bahasa Indonesia natural, tekankan outcome bukan arsitektur

## Decisions Log

| Date       | Decision                                                  | Rationale                                             |
| ---------- | --------------------------------------------------------- | ----------------------------------------------------- |
| 2026-11-04 | Vermilion `#ff3e00` (Svelte) + Magenta `#ec82b0` (Elysia) | Identitas resmi kedua proyek; bukan hijau/teal        |
| 2026-11-04 | Glass morphism                                            | Modern tanpa berat; pakai backdrop-blur + token glass |
| 2026-11-04 | Dark default + toggle                                     |
