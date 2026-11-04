<script lang="ts">
	import { eden } from '#lib/client/client.ts'

	let loading = $state(false)
	let status = $state<'idle' | 'success' | 'error'>('idle')
	let latency = $state<number | null>(null)
	let theme = $state<'dark' | 'light'>('dark')
	{
		try {
			const stored = document?.documentElement?.dataset?.theme
			if (stored === 'light' || stored === 'dark') theme = stored
		} catch {
			// ignore
		}
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
</script>

<svelte:head>
	<title>Svelysia — Template SvelteKit × Elysia di Cloudflare Workers</title>
	<meta
		name="description"
		content="Svelysia adalah template techstack SvelteKit 3, Elysia 2 RC, dan Cloudflare Workers. Clone, jalankan, deploy."
	/>
</svelte:head>

<div style="background: var(--glow), var(--color-bg); color: var(--color-text)" class="min-h-screen">
	<header class="border-b backdrop-blur-md" style="background: var(--color-glass); border-color: var(--color-border); position: sticky; top: 0; z-index: var(--z-header)">
		<div class="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-4 sm:px-6">
			<a href="#top" class="flex items-center gap-2 text-base font-semibold">
				<img src="/icon-192.png" alt="" width="26" height="26" />
				<span class="font-display">Svelysia</span>
			</a>
			<div class="flex items-center gap-3">
				<a
					href="#mulai"
					class="text-sm underline-offset-4 hover:underline"
					style="color: var(--color-text-muted)"
				>
					Mulai cepat
				</a>
				<button
					type="button"
					onclick={toggleTheme}
					class="inline-flex h-7 items-center rounded-md border px-2.5 font-mono text-xs font-semibold uppercase tracking-[var(--tracking-label)]"
					style="border-color: var(--color-border-strong); color: var(--color-text-muted)"
					aria-label="Ganti tema" aria-pressed={theme === 'dark'}
				>
					{theme === 'dark' ? 'Dark' : 'Light'}
				</button>
			</div>
		</div>
	</header>

	<main id="main" class="mx-auto w-full max-w-5xl px-4 sm:px-6">
		<section class="py-20 sm:py-28" aria-labelledby="hero-heading">
			<p
				class="font-mono text-xs font-semibold tracking-[var(--tracking-label)] uppercase"
				style="color: var(--color-primary)"
			>
				Template · SvelteKit 3 · Elysia 2 RC · Cloudflare Workers
			</p>
			<h1
				id="hero-heading"
				class="mt-5 max-w-3xl text-5xl leading-[1.05] font-bold tracking-tight sm:text-6xl"
			>
				Stack cepat, dari hari pertama.
			</h1>
			<p
				class="mt-6 max-w-2xl text-lg leading-8"
				style="color: var(--color-text-muted)"
			>
				Svelysia adalah techstack template untuk aplikasi web: frontend Svelte, API Elysia,
				dan Workers di edge. Tipe yang Anda definisikan di server langsung dipakai di frontend
				lewat Eden Treaty. Mau cepat, bukan aneh-aneh.
			</p>
			<div class="mt-9 flex flex-wrap items-center gap-4">
				<button
					type="button"
					onclick={checkApi}
					disabled={loading}
					class="btn-primary inline-flex h-12 items-center rounded-lg px-6 text-base font-semibold shadow-sm transition duration-75 disabled:opacity-50"
					>
					{loading ? 'Menghubungkan…' : 'Tes endpoint live'}
				</button>
				<a
					href="#mulai"
					class="inline-flex h-12 items-center rounded-lg border px-6 text-base font-medium transition duration-75 hover:opacity-70"
					style="border-color: var(--color-border-strong); color: var(--color-text)"
				>
					Lihat cara pakai
				</a>
			</div>
			<code
				class="mt-8 inline-block rounded-lg border px-4 py-3 font-mono text-sm"
				style="background: var(--color-terminal-bg); color: var(--color-terminal-fg); border-color: var(--color-border)"
			>
				git clone svelysia && bun install && bun dev
			</code>

			<div
				class="mt-10 max-w-2xl overflow-hidden rounded-xl border text-left backdrop-blur-xl shadow-[var(--shadow-glass)]"
				style="background: var(--color-terminal-bg); color: var(--color-terminal-fg); border-color: var(--color-border)"
				aria-live="polite"
			>
				<div
					class="flex items-center justify-between border-b px-5 py-3.5"
					style="border-color: var(--color-border)"
				>
					<span class="flex items-center gap-3 text-sm">
						<span class="font-mono font-semibold" style="color: var(--color-primary)">GET</span>
						<span class="font-mono">/api/health</span>
					</span>
					<span class="flex items-center gap-2 text-sm" style="color: var(--color-text-muted)">
						<span
							class="size-2.5 rounded-full {loading
								? 'bg-[var(--color-warn)]'
								: status === 'success'
									? 'bg-[var(--color-accent)]'
									: status === 'error'
										? 'bg-[var(--color-danger)]'
										: 'bg-[var(--color-idle)]'}"
						></span>
						{loading ? 'Memeriksa…' : status === 'success' ? `Terhubung · ${latency}ms` : status === 'error' ? 'Gagal' : 'Belum dites'}
					</span>
				</div>
				<pre
					class="overflow-x-auto px-5 py-4 font-mono text-sm leading-6">GET /api/health memeriksa bahwa server, API, dan edge sudah terhubung.
Klik "Tes endpoint live" untuk memanggil endpoint asli dari browser ini.</pre>
			</div>
		</section>

		<section
			aria-label="Kecepatan stack"
			class="border-t py-16 sm:py-20"
			style="border-color: var(--color-border)"
		>
			<h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
				Kecepatan itu fitur, bukan hiasan.
			</h2>
			<p class="mt-5 max-w-2xl text-base leading-7" style="color: var(--color-text-muted)">
				Elysia dibangun di atas Bun dan Web Standard. Di benchmark TechEmpower, ia mencatatkan
				angka jauh di atas Express dan Fastify — bukan janji, ada angkanya.
			</p>
			<ul class="mt-10 grid gap-6 sm:grid-cols-3">
				<li class="rounded-xl border p-6 backdrop-blur-md shadow-sm" style="background: var(--color-glass); box-shadow: var(--shadow-glass); border-color: var(--color-glass-border)">
					<p class="font-display text-4xl font-bold tracking-tight" style="color: var(--color-primary)">21×</p>
					<p class="mt-2 text-sm leading-6" style="color: var(--color-text-muted)">lebih cepat dari Express di TechEmpower PlainText</p>
				</li>
				<li class="rounded-xl border p-6 backdrop-blur-md shadow-sm" style="background: var(--color-glass); box-shadow: var(--shadow-glass); border-color: var(--color-glass-border)">
					<p class="font-display text-4xl font-bold tracking-tight" style="color: var(--color-primary)">6×</p>
					<p class="mt-2 text-sm leading-6" style="color: var(--color-text-muted)">lebih cepat dari Fastify, dalam benchmark yang sama</p>
				</li>
				<li class="rounded-xl border p-6 backdrop-blur-md shadow-sm" style="background: var(--color-glass); box-shadow: var(--shadow-glass); border-color: var(--color-glass-border)">
					<p class="font-display text-4xl font-bold tracking-tight" style="color: var(--color-primary)">0</p>
					<p class="mt-2 text-sm leading-6" style="color: var(--color-text-muted)">server yang harus Anda rawat — semua berjalan di edge</p>
				</li>
			</ul>
		</section>

		<section
			aria-label="Arsitektur"
			class="border-t py-16 sm:py-20"
			style="border-color: var(--color-border)"
		>
			<h2 class="text-3xl font-bold tracking-tight sm:text-4xl">Satu definisi untuk semua lapisan.</h2>
			<p class="mt-5 max-w-2xl text-base leading-7" style="color: var(--color-text-muted)">
				Skema adalah satu-satunya sumber kebenaran. Ia menjaga request di runtime, memberi
				tipe di frontend, dan menghasilkan dokumentasi OpenAPI — dari definisi yang sama.
			</p>
			<div class="mt-10 grid gap-10 lg:grid-cols-2">
				<div>
					<h3 class="text-xl font-semibold">Validasi runtime memakai skema yang sama</h3>
					<p class="mt-3 text-base leading-7" style="color: var(--color-text-muted)">
						Declare route sekali di Elysia dengan <span class="font-mono text-sm px-1.5 py-0.5 rounded" style="background: var(--color-surface-raised)">t.*</span>.
						Request yang tidak cocok ditolak sebelum menyentuh handler Anda. Tanpa
						validasi terpisah.
					</p>
					<h3 class="mt-8 text-xl font-semibold">Tipe mengalir ke frontend</h3>
					<p class="mt-3 text-base leading-7" style="color: var(--color-text-muted)">
						Eden Treaty membaca tipe langsung dari definisi server. Ubah API, frontend
						ikut berubah — compile-time error kalau tidak cocok. Tanpa code generation.
					</p>
					<h3 class="mt-8 text-xl font-semibold">Docs otomatis</h3>
					<p class="mt-3 text-base leading-7" style="color: var(--color-text-muted)">
						OpenAPI dihasilkan dari skema yang sama, tersedia di
						<span class="font-mono text-sm px-1.5 py-0.5 rounded" style="background: var(--color-surface-raised)">/api/openapi</span>.
						Tidak ada file docs yang basi.
					</p>
				</div>
				<div
					class="overflow-hidden rounded-xl border backdrop-blur-xl"
					style="background: var(--color-terminal-bg); color: var(--color-terminal-fg); border-color: var(--color-border)"
				>
					<pre
						class="overflow-x-auto p-6 font-mono text-sm leading-6"><code>.get('/health', &#123; response: t.Object(&#123; status: t.Literal('ok') &#125;) &#125;, () =&gt; (&#123; status: 'ok' &#125;))

// Frontend — types come from App, not manual copies
const &#123; data &#125; = await eden.api.health.get()</code></pre>
				</div>
			</div>
		</section>

		<section
			id="mulai"
			aria-label="Mulai cepat"
			class="border-t py-16 sm:py-20"
			style="border-color: var(--color-border)"
		>
			<h2 class="text-3xl font-bold tracking-tight sm:text-4xl">Mulai dalam tiga langkah.</h2>
			<ol class="mt-10 grid gap-6 sm:grid-cols-3">
				<li class="rounded-xl border p-6 backdrop-blur-md shadow-sm" style="background: var(--color-glass); box-shadow: var(--shadow-glass); border-color: var(--color-glass-border)">
					<p class="font-mono text-sm font-semibold" style="color: var(--color-primary)">01</p>
					<h3 class="mt-3 font-semibold">Clone dan jalankan</h3>
					<code class="mt-3 block rounded-md px-3 py-2 font-mono text-sm" style="background: var(--color-surface-raised)">bun dev</code>
					<p class="mt-3 text-sm leading-6" style="color: var(--color-text-muted)">
						Buka halaman, klik Tes endpoint live, pastikan stack hidup.
					</p>
				</li>
				<li class="rounded-xl border p-6 backdrop-blur-md shadow-sm" style="background: var(--color-glass); box-shadow: var(--shadow-glass); border-color: var(--color-glass-border)">
					<p class="font-mono text-sm font-semibold" style="color: var(--color-primary)">02</p>
					<h3 class="mt-3 font-semibold">Tambah route di satu tempat</h3>
					<code class="mt-3 block rounded-md px-3 py-2 font-mono text-sm" style="background: var(--color-surface-raised)">src/lib/server/api/index.ts</code>
					<p class="mt-3 text-sm leading-6" style="color: var(--color-text-muted)">
						Tulis route dengan validasi. Frontend langsung dapat tipenya, docs ikut update.
					</p>
				</li>
				<li class="rounded-xl border p-6 backdrop-blur-md shadow-sm" style="background: var(--color-glass); box-shadow: var(--shadow-glass); border-color: var(--color-glass-border)">
					<p class="font-mono text-sm font-semibold" style="color: var(--color-primary)">03</p>
					<h3 class="mt-3 font-semibold">Verifikasi, lalu deploy</h3>
					<code class="mt-3 block rounded-md px-3 py-2 font-mono text-sm" style="background: var(--color-surface-raised)">bun run verify && bun run deploy</code>
					<p class="mt-3 text-sm leading-6" style="color: var(--color-text-muted)">
						Gate yang sama dengan CI. Lolos berarti siap rilis di edge.
					</p>
				</li>
			</ol>
		</section>
	</main>

	<footer class="border-t" style="border-color: var(--color-border)">
		<div
			class="mx-auto flex w-full max-w-5xl flex-col items-start justify-between gap-2 px-4 py-8 text-sm sm:flex-row sm:items-center sm:px-6"
			style="color: var(--color-text-muted)"
		>
			<p class="flex items-center gap-2">
				<img src="/icon-192.png" alt="" width="20" height="20" />
				Svelysia · v0.0.1
			</p>
			<p>SvelteKit 3 · Elysia 2 RC · Eden Treaty · Cloudflare Workers · Bun 1.4.4</p>
		</div>
	</footer>
</div>
