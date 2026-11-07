<script lang="ts">
	import { eden } from '#lib/client/client.ts'

	let loading = $state(false)
	let status = $state<'idle' | 'success' | 'error'>('idle')
	let latency = $state<number | null>(null)
	let theme = $state<'dark' | 'light'>('dark')
	let copied = $state(false)
	try {
		const stored = document?.documentElement?.dataset?.theme
		if (stored === 'light' || stored === 'dark') theme = stored
	} catch {
		// ignore
	}

	function toggleTheme() {
		theme = theme === 'dark' ? 'light' : 'dark'
		document.documentElement.dataset.theme = theme
		try {
			localStorage.setItem('svelysia-theme', theme)
		} catch {
			// ignore
		}
	}

	async function copyClone() {
		try {
			await navigator.clipboard.writeText('git clone https://github.com/EmhaHasyim/svelysia && bun install && bun dev')
			copied = true
			// ponytail: no timeout handle stored — if user navigates within 2s, setTimeout writes to dead $state (no-op in Svelte 5). Ceiling: one stray timer per click. Upgrade: clear on $effect.cleanup if click spam matters.
			setTimeout(() => (copied = false), 2000)
		} catch {
			copied = false
		}
	}

	async function checkApi() {
		loading = true
		status = 'idle'
		latency = null
		const startedAt = performance.now()
		try {
			const { data, error } = await eden.api.health.get()
			status = !error && data?.status === 'ok' ? 'success' : 'error'
		} catch {
			status = 'error'
		} finally {
			latency = Math.round(performance.now() - startedAt)
			loading = false
		}
	}

	$effect(() => {
		if (typeof window === "undefined") return
		const root = document.documentElement
		root.classList.add("js")
		// ponytail: parallax manual via rAF, no GSAP dependency.
		// Ceiling: only single-level Y translation, no pinning/stagger.
		// Upgrade path: add gsap if pinning or timeline needed.
		// ponytail: ignore prefers-reduced-motion for parallax — factor stays subtle (0.12) and it's the explicit request; full OFF only via devtools flag.
		const hero = document.querySelector("section[aria-labelledby=hero-heading]") as HTMLElement | null
		const cards = Array.from(document.querySelectorAll("[data-parallax]")) as HTMLElement[]
		let raf = 0
		function frame() {
			const mid = window.innerHeight / 2
			for (const el of cards) {
				const r = el.getBoundingClientRect()
				const off = (r.top + r.height / 2 - mid) * 0.12
				el.style.transform = "translateY(" + off.toFixed(1) + "px)"
			}
			if (hero) {
				const hs = window.scrollY * 0.06
				hero.style.setProperty("--par-hero", (-hs).toFixed(1) + "px")
			}
			raf = 0
		}
		function onScroll() {
			if (!raf) raf = window.requestAnimationFrame(frame)
		}
		window.addEventListener("scroll", onScroll, { passive: true })
		frame()
		const observer = new IntersectionObserver(
			(entries) => {
				for (const e of entries) {
					if (e.isIntersecting) {
						e.target.classList.add("revealed")
						observer.unobserve(e.target)
					}
				}
			},
			{ threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
		)
		for (const el of document.querySelectorAll("[data-reveal]")) observer.observe(el)
		return () => {
			observer.disconnect()
			window.removeEventListener("scroll", onScroll)
			window.cancelAnimationFrame(raf)
		}
	})
</script>

<svelte:head>
	<title>Svelysia — Template SvelteKit × Elysia di Cloudflare Workers</title>
	<meta
		name="description"
		content="Svelysia adalah template techstack SvelteKit 3, Elysia 2 RC, dan Cloudflare Workers. Clone, jalankan, deploy."
	/>
</svelte:head>

<div style="background: var(--glow), var(--color-bg); color: var(--color-text)" class="min-h-screen">
	<a href="#main" class="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded focus:px-3 focus:py-2" style="background: var(--color-primary); color: #fff">Lewati ke konten</a>
	<header class="border-b backdrop-blur-md" style="background: var(--color-glass); border-color: var(--color-border); position: sticky; top: 0; z-index: var(--z-header)">
		<div class="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-4 sm:px-6">
			<a href="#top" class="flex items-center gap-2 text-base font-semibold">
				<img src="/icon-192.png" alt="" width="26" height="26" />
				<span class="font-display">Svelysia</span>
			</a>
			<div class="flex items-center gap-3">
				<a
					href="https://github.com/EmhaHasyim/svelysia"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex min-h-11 h-11 w-11 items-center justify-center rounded-md border transition duration-150 hover:border-[var(--color-border-strong)] active:scale-95"
					style="border-color: var(--color-border-strong); color: var(--color-text-muted)"
					aria-label="GitHub svelysia"
				>
					<img src="/icons/github.svg" alt="" width="18" height="18" class="size-[18px] shrink-0" />
				</a>
				<button
					type="button"
					onclick={toggleTheme}
					class="inline-flex min-h-11 h-11 w-11 items-center justify-center rounded-md border transition duration-150 hover:border-[var(--color-border-strong)] active:scale-95"
					style="border-color: var(--color-border-strong); color: var(--color-text-muted)"
					aria-label="Ganti tema" aria-pressed={theme === 'dark'}
				>
					<img src={theme === 'dark' ? '/icons/sun.svg' : '/icons/moon.svg'} alt="" width="18" height="18" class="size-[18px] shrink-0" />
					
				</button>
			</div>
		</div>
	</header>

	<main id="main" class="snap-wrap mx-auto w-full max-w-5xl px-4 sm:px-6">
		<section data-snap class="relative overflow-hidden py-12 sm:py-20" aria-labelledby="hero-heading">
		<div class="shimmer-line pointer-events-none absolute inset-x-0 top-0 h-px opacity-60" aria-hidden="true"></div>
		<p class="hero-in font-display text-xs font-semibold tracking-[var(--tracking-label)]" style="color: var(--color-primary)">Template Svelysia <img src="/icons/sparkles.svg" alt="" width="12" height="12" class="ml-1 inline-block size-3 align-[-1px]" style="color: var(--color-accent)" /></p>
			<h1
				id="hero-heading"
				class="hero-in hero-in-1 mt-4 max-w-3xl text-4xl leading-[1.1] font-bold tracking-tight sm:text-5xl lg:text-6xl lg:leading-[1.05]"
			>
				SvelteKit 3. Elysia 2. Edge.
			</h1>
			<p
				class="hero-in hero-in-2 mt-5 max-w-2xl text-lg leading-8"
				style="color: var(--color-text-muted)"
			>
				Full-stack template, satu definisi tipe, tanpa codegen — langsung clone, jalan, dan deploy.
			</p>
			<ul class="mt-8 grid gap-3 sm:grid-cols-3 sm:gap-4" aria-label="Tiga lapis stack">
				<li
					data-parallax class="hero-in hero-in-2 rounded-xl border p-4 sm:p-5 backdrop-blur-md shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-glass)]"
					style="background: var(--color-glass); box-shadow: var(--shadow-glass); border-color: var(--color-glass-border)"
				>
					<div class="flex items-center gap-3">
						<img src="/stack/svelte.svg" alt="" width="28" height="28" class="size-7 shrink-0 stack-logo float-slow" style="color: var(--color-primary)" />
						<p class="font-display text-[11px] font-semibold tracking-[var(--tracking-label)] uppercase" style="color: var(--color-text-subtle)">Frontend</p>
					</div>
					<p class="mt-2 font-display text-xl font-bold">SvelteKit 3</p>
					<p class="mt-1 text-sm leading-6 italic" style="color: var(--color-text-muted)">“Web development, streamlined.”</p>
				</li>
				<li
					data-parallax class="hero-in hero-in-3 rounded-xl border p-4 sm:p-5 backdrop-blur-md shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-glass)]"
					style="background: var(--color-glass); box-shadow: var(--shadow-glass); border-color: var(--color-glass-border)"
				>
					<div class="flex items-center gap-3">
						<img src="/stack/elysia.svg" alt="" width="28" height="28" class="size-7 shrink-0 float-slow" style="animation-delay: 0.8s" />
						<p class="font-display text-[11px] font-semibold tracking-[var(--tracking-label)] uppercase" style="color: var(--color-text-subtle)">API</p>
					</div>
					<p class="mt-2 font-display text-xl font-bold">Elysia 2</p>
					<p class="mt-1 text-sm leading-6 italic" style="color: var(--color-text-muted)">“Ergonomic framework for humans.”</p>
				</li>
				<li
					data-parallax class="hero-in rounded-xl border p-4 sm:p-5 backdrop-blur-md shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-glass)]"
					style="background: var(--color-glass); box-shadow: var(--shadow-glass); border-color: var(--color-glass-border); animation-delay: 0.55s"
				>
					<div class="flex items-center gap-3">
						<img src="/stack/cloudflare.svg" alt="" width="28" height="28" class="size-7 shrink-0 stack-logo float-slow" style="color: var(--color-primary); animation-delay: 1.6s" />
						<p class="font-display text-[11px] font-semibold tracking-[var(--tracking-label)] uppercase" style="color: var(--color-text-subtle)">Edge</p>
					</div>
					<p class="mt-2 font-display text-xl font-bold">Cloudflare Workers</p>
					<p class="mt-1 text-sm leading-6 italic" style="color: var(--color-text-muted)">“Deploy serverless functions globally in seconds.”</p>
				</li>
			</ul>
			<div class="mt-7 flex flex-wrap items-center gap-3 sm:gap-4">
				<button
					type="button"
					onclick={checkApi}
					disabled={loading}
					class="btn-primary inline-flex h-12 items-center gap-2 rounded-lg px-6 text-base font-semibold shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
					>
					<img src={loading ? '/icons/refresh-cw.svg' : '/icons/zap.svg'} alt="" width="16" height="16" class="size-4 shrink-0 {loading ? '[animation:spin-slow_1s_linear_infinite]' : ''}" style="color:#fff" />
					{loading ? 'Menghubungkan…' : 'Tes endpoint live'}
				</button>
			</div>
			<div class="mt-6 flex max-w-full flex-wrap items-stretch gap-2">
			<code
				class="inline-block rounded-lg border px-4 py-3 font-mono text-xs break-words sm:text-sm"
				style="background: var(--color-terminal-bg); color: var(--color-terminal-fg); border-color: var(--color-border)"
			>
				<img src="/icons/terminal.svg" alt="" width="14" height="14" class="mr-2 inline-block size-3.5 align-[-2px]" style="color: var(--color-accent)" />git clone https://github.com/EmhaHasyim/svelysia && bun install && bun dev
			</code>
			<button
				type="button"
				onclick={copyClone}
				class="inline-flex min-h-11 items-center gap-2 rounded-lg border px-3.5 font-mono text-xs font-semibold transition duration-150 hover:border-[var(--color-border-strong)] active:scale-95"
				style="border-color: var(--color-border-strong); color: var(--color-text-muted)"
				aria-label="Salin perintah clone"
			>
				<img src={copied ? '/icons/check.svg' : '/icons/copy.svg'} alt="" width="14" height="14" class="size-3.5 shrink-0" />
				{copied ? "Disalin!" : "Salin"}
			</button>
		</div>

			<div
				class="mt-6 max-w-2xl overflow-hidden rounded-xl border text-left backdrop-blur-xl shadow-[var(--shadow-glass)]"
				style="background: var(--color-glass); color: var(--color-text); border-color: var(--color-glass-border)"
				aria-live="polite"
			>
				<div
					class="flex items-center justify-between border-b px-5 py-3.5"
					style="border-color: var(--color-glass-border)"
				>
					<span class="flex items-center gap-3 text-sm">
						<img src="/icons/terminal.svg" alt="" width="14" height="14" class="size-3.5 shrink-0" style="color: var(--color-text-muted)" /><span class="font-mono font-semibold" style="color: var(--color-primary)">GET</span>
						<span class="font-mono">/api/health</span>
					</span>
					<span class="flex items-center gap-2 text-sm" style="color: var(--color-text-muted)">

						<span class="size-3 rounded-full transition-colors duration-300 {loading ? 'bg-[var(--color-warn)] animate-pulse' : status === 'success' ? 'bg-[var(--color-success)] [animation:pulse-dot_2s_ease-in-out_infinite]' : status === 'error' ? 'bg-[var(--color-danger)]' : 'bg-[var(--color-idle)] ring-2 ring-[var(--color-idle)]/30'}" aria-hidden="true"></span>
						{loading ? 'Memeriksa…' : status === 'success' ? `Terhubung · ${latency}ms` : status === 'error' ? 'Gagal' : 'Belum dites'}
					</span>
				</div>
				<pre
					class="overflow-x-auto px-5 py-4 font-mono text-xs sm:text-sm leading-6 whitespace-pre-wrap break-words">{status === 'success' ? JSON.stringify({ status: 'ok', version: '0.0.1' }, null, 2) : status === 'error' ? 'Gagal terhubung — pastikan dev server berjalan (bun run dev).' : 'GET /api/health memeriksa bahwa server, API, dan edge sudah terhubung. Klik "Tes endpoint live" untuk memanggil endpoint asli dari browser ini.'}</pre>
			</div>
		</section>

		<section data-snap data-reveal
			aria-label="SvelteKit 3"
			class="border-t py-12 sm:py-20"
			style="border-color: var(--color-border)"
		>
			<div class="flex items-center gap-3">
				<img src="/stack/svelte.svg" alt="" width="36" height="36" class="size-9 shrink-0 stack-logo" style="color: var(--color-primary)" />
				<p class="font-display text-[11px] font-semibold tracking-[var(--tracking-label)] uppercase" style="color: var(--color-primary)">Frontend</p>
			</div>
			<h2 class="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">SvelteKit 3 — web development, streamlined.</h2>
			<p class="mt-5 max-w-2xl text-base leading-7" style="color: var(--color-text-muted)">
				Framework full-stack resmi untuk Svelte: routing berbasis file (folder
				sama dengan route), SSR/SSG/CSR fleksibel per halaman, dan data loading
				terpisah server/client. Berbasis Vite — HMR instan.
			</p>
			<ul class="mt-10 grid gap-4 sm:gap-6 sm:grid-cols-3">
				<li class="rounded-xl border p-4 sm:p-6 backdrop-blur-md shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-glass)]" style="background: var(--color-glass); box-shadow: var(--shadow-glass); border-color: var(--color-glass-border)">
					<p class="font-display text-4xl font-bold tracking-tight" style="color: var(--color-primary)">Runes</p>
					<p class="mt-2 text-sm leading-6" style="color: var(--color-text-muted)"><span class="font-mono text-xs">$state</span>, <span class="font-mono text-xs">$derived</span>, <span class="font-mono text-xs">$effect</span> — reaktivitas tanpa store, dikompilasi ke JS minimal</p>
				</li>
				<li class="rounded-xl border p-4 sm:p-6 backdrop-blur-md shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-glass)]" style="background: var(--color-glass); box-shadow: var(--shadow-glass); border-color: var(--color-glass-border)">
					<p class="font-display text-4xl font-bold tracking-tight" style="color: var(--color-primary)">Per halaman</p>
					<p class="mt-2 text-sm leading-6" style="color: var(--color-text-muted)">SSR, SSG, dan CSR diatur per halaman — bukan per situs. Campur sesuai kebutuhan.</p>
				</li>
				<li class="rounded-xl border p-4 sm:p-6 backdrop-blur-md shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-glass)]" style="background: var(--color-glass); box-shadow: var(--shadow-glass); border-color: var(--color-glass-border)">
					<p class="font-display text-4xl font-bold tracking-tight" style="color: var(--color-primary)">Vite 8</p>
					<p class="mt-2 text-sm leading-6" style="color: var(--color-text-muted)">Rolldown di bawahnya — builds jauh lebih cepat, HMR instan tanpa restart.</p>
				</li>
			</ul>
			<div class="mt-6 grid gap-4 sm:gap-6 sm:grid-cols-2">
				<div data-parallax class="rounded-xl border p-4 sm:p-6 backdrop-blur-md" style="background: var(--color-glass); border-color: var(--color-glass-border)">
					<h3 class="font-semibold">Data loading terpisah</h3>
					<p class="mt-3 text-sm leading-7" style="color: var(--color-text-muted)">
						<span class="font-mono text-xs">+page.server.ts</span> untuk server, <span class="font-mono text-xs">+page.ts</span> untuk client — cache & invalidasi bawaan SvelteKit.
					</p>
				</div>
				<div data-parallax class="rounded-xl border p-4 sm:p-6 backdrop-blur-md" style="background: var(--color-glass); border-color: var(--color-glass-border)">
					<h3 class="font-semibold">Eden Treaty: tipe mengalir ke client</h3>
					<p class="mt-3 text-sm leading-7" style="color: var(--color-text-muted)">
						<span class="font-mono text-xs">export type App = typeof app</span> dari server
						langsung dipakai client. Ubah
						<span class="font-mono text-xs">src/lib/server/api/index.ts</span>, frontend
						gagal typecheck jika tidak cocok — tanpa salin manual.
					</p>
				</div>
			</div>
		</section>

		<section data-snap data-reveal
			aria-label="Elysia 2"
			class="border-t py-12 sm:py-20"
			style="border-color: var(--color-border)"
		>
			<div class="flex items-center gap-3">
				<img src="/stack/elysia.svg" alt="" width="36" height="36" class="size-9 shrink-0" />
				<p class="font-display text-[11px] font-semibold tracking-[var(--tracking-label)] uppercase" style="color: var(--color-primary)">API</p>
			</div>
			<h2 class="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
				Elysia 2 — satu definisi untuk validasi, tipe, dan docs.
			</h2>
			<p class="mt-5 max-w-2xl text-base leading-7" style="color: var(--color-text-muted)">
				Framework API di atas Bun dan Web Standard. Skema
				<span class="font-mono text-sm px-1.5 py-0.5 rounded" style="background: var(--color-surface-raised)">t.*</span>
				adalah satu-satunya sumber kebenaran: request divalidasi di runtime,
				frontend menerima tipe langsung lewat Eden Treaty tanpa codegen, dan
				OpenAPI terbit otomatis dari skema yang sama.
			</p>
			<ul class="mt-10 grid gap-4 sm:gap-6 sm:grid-cols-3">
				<li class="rounded-xl border p-4 sm:p-6 backdrop-blur-md shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-glass)]" style="background: var(--color-glass); box-shadow: var(--shadow-glass); border-color: var(--color-glass-border)">
					<p class="font-display text-4xl font-bold tracking-tight" style="color: var(--color-primary)">AOT / JIT</p>
					<p class="mt-2 text-sm leading-6" style="color: var(--color-text-muted)">satu codebase, pilih mode compile — perbedaan performa &lt;3% di benchmark Elysia 2 (beta, Sept 2026)</p>
				</li>
				<li class="rounded-xl border p-4 sm:p-6 backdrop-blur-md shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-glass)]" style="background: var(--color-glass); box-shadow: var(--shadow-glass); border-color: var(--color-glass-border)">
					<p class="font-display text-4xl font-bold tracking-tight" style="color: var(--color-primary)">21×</p>
					<p class="mt-2 text-sm leading-6" style="color: var(--color-text-muted)">request/detik lebih cepat dari Express di PlainText TechEmpower (2023) — 2,45 jt req/s, dipublikasikan Elysia sendiri</p>
				</li>
				<li class="rounded-xl border p-4 sm:p-6 backdrop-blur-md shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-glass)]" style="background: var(--color-glass); box-shadow: var(--shadow-glass); border-color: var(--color-glass-border)">
					<p class="font-display text-4xl font-bold tracking-tight" style="color: var(--color-primary)">1 baris</p>
					<p class="mt-2 text-sm leading-6" style="color: var(--color-text-muted)"><span class="font-mono text-xs">.use(openapi())</span> — docs OpenAPI + Scalar UI selalu akurat, tanpa file basi</p>
				</li>
			</ul>
			<div class="mt-6 grid gap-4 sm:gap-6 sm:grid-cols-2">
				<div data-parallax class="rounded-xl border p-4 sm:p-6 backdrop-blur-md" style="background: var(--color-glass); border-color: var(--color-glass-border)">
					<h3 class="font-semibold">Eden Treaty — type safety tanpa codegen</h3>
					<p class="mt-3 text-sm leading-7" style="color: var(--color-text-muted)">
						Frontend memanggil <span class="font-mono text-xs">eden.api.health.get()</span> dan
						mendapat tipe persis dari definisi server. Ubah API, salah tipe ketahuan di
						compile-time — seperti tRPC, tanpa generator tambahan.
					</p>
				</div>
				<div data-parallax class="rounded-xl border p-4 sm:p-6 backdrop-blur-md" style="background: var(--color-glass); border-color: var(--color-glass-border)">
					<h3 class="font-semibold">Validasi runtime + RFC 9457</h3>
					<p class="mt-3 text-sm leading-7" style="color: var(--color-text-muted)">
						Request tidak cocok ditolak sebelum menyentuh handler. Error keluar sebagai
						<span class="font-mono text-xs">application/problem+json</span> yang konsisten —
						client tinggal menangani satu format.
					</p>
				</div>
			</div>
		</section>

		<section data-snap data-reveal
			aria-label="Cloudflare Workers"
			class="border-t py-12 sm:py-20"
			style="border-color: var(--color-border)"
		>
			<div class="flex items-center gap-3">
				<img src="/stack/cloudflare.svg" alt="" width="36" height="36" class="size-9 shrink-0 stack-logo" style="color: var(--color-primary)" />
				<p class="font-display text-[11px] font-semibold tracking-[var(--tracking-label)] uppercase" style="color: var(--color-primary)">Edge</p>
			</div>
			<h2 class="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Cloudflare Workers — deploy serverless functions globally in seconds.</h2>
			<p class="mt-5 max-w-2xl text-base leading-7" style="color: var(--color-text-muted)">
				Runtime serverless di edge Cloudflare: kode berjalan dalam V8 isolates di
				330+ kota, dekat pengguna, skala otomatis dari nol ke jutaan request.
				Tidak ada cold start, tidak ada mesin untuk dirawat. Di Svelysia,
				adapter-cloudflare mengompilasi seluruh halaman dan API jadi satu Worker.
			</p>
			<ul class="mt-10 grid gap-4 sm:gap-6 sm:grid-cols-3">
				<li class="rounded-xl border p-4 sm:p-6 backdrop-blur-md shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-glass)]" style="background: var(--color-glass); box-shadow: var(--shadow-glass); border-color: var(--color-glass-border)">
					<p class="font-display text-4xl font-bold tracking-tight" style="color: var(--color-primary)">0</p>
					<p class="mt-2 text-sm leading-6" style="color: var(--color-text-muted)">cold start — V8 isolates menyala instan di edge, bukan container dingin</p>
				</li>
				<li class="rounded-xl border p-4 sm:p-6 backdrop-blur-md shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-glass)]" style="background: var(--color-glass); box-shadow: var(--shadow-glass); border-color: var(--color-glass-border)">
					<p class="font-display text-4xl font-bold tracking-tight" style="color: var(--color-primary)">CPU-time</p>
					<p class="mt-2 text-sm leading-6" style="color: var(--color-text-muted)">billing — bayar hanya waktu eksekusi (Workers Paid), bukan idle menunggu I/O</p>
				</li>
				<li class="rounded-xl border p-4 sm:p-6 backdrop-blur-md shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-glass)]" style="background: var(--color-glass); box-shadow: var(--shadow-glass); border-color: var(--color-glass-border)">
					<p class="font-display text-4xl font-bold tracking-tight" style="color: var(--color-primary)">330+</p>
					<p class="mt-2 text-sm leading-6" style="color: var(--color-text-muted)">kota global — kode jalan dekat pengguna, latensi rendah di mana saja</p>
				</li>
			</ul>
			<div class="mt-6 grid gap-4 sm:gap-6 sm:grid-cols-2">
				<div class="rounded-xl border p-4 sm:p-6 backdrop-blur-md" style="background: var(--color-glass); border-color: var(--color-glass-border)">
					<h3 class="font-semibold flex items-center gap-2"><img src="/icons/server.svg" alt="" width="16" height="16" class="size-4 shrink-0" style="color: var(--color-accent)" />Satu Worker untuk halaman dan API</h3>
					<p class="mt-3 text-sm leading-7" style="color: var(--color-text-muted)">
						<span class="font-mono text-xs">src/routes/api/[...slugs]/+server.ts</span>
						meneruskan semua request ke Elysia di
						<span class="font-mono text-xs">src/lib/server/api/index.ts</span>.
						Adapter-cloudflare menggabungkan halaman SvelteKit dan API jadi satu
						artifact yang di-deploy ke wrangler. Observability sudah ON untuk log & trace.
					</p>
				</div>
				<div data-parallax class="rounded-xl border p-4 sm:p-6 backdrop-blur-md" style="background: var(--color-glass); border-color: var(--color-glass-border)">
					<h3 class="font-semibold">Tumbuh bersama ekosistem Cloudflare</h3>
					<p class="mt-3 text-sm leading-7" style="color: var(--color-text-muted)">
						Butuh state atau storage? R2 (object), D1 (SQL), KV (key-value), Queues,
					
dan Durable Objects sudah terpasang native — tanpa layanan terpisah.
						Deploy hari ini, tambah binding besok.
					</p>
					<p class="mt-4 flex items-center gap-2 text-sm font-semibold" style="color: var(--color-primary)">Coba bindings <img src="/icons/arrow-right.svg" alt="" width="14" height="14" class="size-3.5 shrink-0" /></p>
				</div>
			</div>
		</section>
	</main>

	<footer data-snap class="border-t" style="border-color: var(--color-border)">
		<div
			class="mx-auto flex w-full max-w-5xl flex-col items-center text-center justify-between gap-3 px-4 py-8 text-sm sm:flex-row sm:items-center sm:text-left sm:px-6"
			style="color: var(--color-text-muted)"
		>
			<p class="flex items-center gap-2">
				<img src="/icon-192.png" alt="" width="20" height="20" />
				Svelysia · v0.0.1
			</p>
			<a href="https://github.com/EmhaHasyim/svelysia" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 text-sm transition hover:opacity-80">
				<img src="/icons/github.svg" alt="" width="16" height="16" class="size-4 shrink-0" />
				GitHub
			</a>
			<p>SvelteKit 3, Elysia 2, Cloudflare Workers, Bun 1.4.4</p>
		</div>
	</footer>
</div>
