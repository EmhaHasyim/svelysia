<script lang="ts">
	import { api } from '$lib/api/client'

	const stack = [
		['SvelteKit', 'Application framework', 'Frontend'],
		['Svelte 5', 'UI and runes', 'Frontend'],
		['TypeScript', 'Type safety', 'Language'],
		['Tailwind CSS', 'Styling system', 'Frontend'],
		['Elysia', 'API framework', 'Backend'],
		['Eden Treaty', 'Type-safe client', 'Backend'],
		['Cloudflare Workers', 'Runtime and deployment', 'Edge'],
		['Vitest', 'Testing', 'Quality'],
		['Oxlint + Oxfmt', 'Code quality', 'Quality'],
	]

	let loading = $state(false)
	let status = $state<'idle' | 'success' | 'error'>('idle')
	let latency = $state<number | null>(null)
	let dark = $state(
		typeof document !== 'undefined' && document.documentElement.classList.contains('dark'),
	)

	function persistTheme(value: boolean) {
		try {
			localStorage.setItem('theme', value ? 'dark' : 'light')
		} catch (error) {
			console.warn('Could not persist theme', error)
		}
	}

	function toggleTheme() {
		dark = !dark
		document.documentElement.classList.toggle('dark', dark)
		persistTheme(dark)
	}

	function goCheckApi() {
		checkApi()
		document.getElementById('api')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
	}

	async function checkApi() {
		loading = true
		status = 'idle'
		latency = null
		const startedAt = performance.now()

		try {
			const { data, error } = await api.health.get()
			latency = Math.round(performance.now() - startedAt)
			status = !error && data.status === 'ok' ? 'success' : 'error'
		} catch {
			latency = Math.round(performance.now() - startedAt)
			status = 'error'
		} finally {
			loading = false
		}
	}

	const statusDot = $derived(
		loading
			? 'bg-primary animate-pulse'
			: status === 'success'
				? 'bg-emerald-500'
				: status === 'error'
					? 'bg-red-500'
					: 'bg-muted-foreground/40',
	)
</script>

<svelte:head>
	<title>Svelysia — Minimal web starter</title>
	<meta
		name="description"
		content="Svelysia adalah Svelte × Elysia: frontend reaktif Svelte 5 dipadukan dengan API Elysia yang type-safe end-to-end."
	/>
</svelte:head>

<div class="min-h-screen bg-background text-foreground antialiased">
	<!-- Sticky nav, like svelte.dev / elysiajs.com -->
	<header class="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-md">
		<nav
			class="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
			aria-label="Navigasi utama"
		>
			<a class="flex items-center gap-2 font-semibold tracking-tight" href="#top">
				<span
					class="grid size-7 place-items-center rounded-md bg-primary text-sm font-bold text-primary-foreground"
					>S</span
				>
				Svelysia
			</a>
			<div class="flex items-center gap-3 text-sm text-muted-foreground sm:gap-6">
				<a class="transition-colors hover:text-foreground" href="#stack">Stack</a>
				<a class="transition-colors hover:text-foreground" href="#code">Kode</a>
				<a class="transition-colors hover:text-foreground" href="#api">API</a>
			</div>
			<div class="flex items-center gap-2">
				<span
					class="hidden rounded-full border border-border px-2.5 py-1 font-mono text-xs text-muted-foreground sm:inline"
					>v0.0.1</span
				>
				<button
					type="button"
					onclick={toggleTheme}
					aria-label={dark ? 'Alih ke mode terang' : 'Alih ke mode gelap'}
					class="grid size-8 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
				>
					{#if dark}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="size-4"
							><circle cx="12" cy="12" r="4" /><path
								d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
							/></svg
						>
					{:else}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="size-4"
							><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg
						>
					{/if}
				</button>
			</div>
		</nav>
	</header>

	<main id="top" class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
		<!-- Hero -->
		<section class="mx-auto max-w-4xl py-16 text-center sm:py-24 lg:py-32 2xl:py-40">
			<a
				href="#stack"
				class="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
			>
				<span class="size-1.5 rounded-full bg-primary"></span>
				SvelteKit × Elysia, siap deploy ke edge
			</a>
			<h1
				class="mx-auto mt-6 max-w-3xl text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[1.02] tracking-tight"
			>
				Mulai lebih cepat.<br /><span class="text-gradient">Bangun lebih baik.</span>
			</h1>
			<p
				class="mx-auto mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8"
			>
				Svelysia adalah Svelte × Elysia — frontend reaktif Svelte 5 dipadukan dengan API Elysia
				yang type-safe end-to-end, siap deploy ke edge dalam satu template minimal.
			</p>
			<div class="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
				<button
					type="button"
					onclick={goCheckApi}
					disabled={loading}
					class="h-12 w-full rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:pointer-events-none disabled:opacity-50 sm:w-auto"
				>
					{loading ? 'Memeriksa API…' : 'Cek API'}
				</button>
				<a
					href="#code"
					class="inline-flex h-12 w-full items-center justify-center rounded-full border border-border bg-card px-8 text-base font-semibold transition-colors hover:border-accent/60 hover:text-accent sm:w-auto"
				>
					Lihat kodenya
				</a>
			</div>
			<p class="mt-5 font-mono text-xs text-muted-foreground">GET /api/health · Eden Treaty</p>
		</section>

		<!-- Benchmark-style stats, a la Elysia -->
		<section
			class="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border text-center sm:grid-cols-3"
			aria-label="Sorotan"
		>
			<div class="bg-card px-6 py-8 sm:py-10">
				<p class="font-mono text-4xl font-bold tracking-tight text-primary sm:text-5xl">9</p>
				<p class="mt-2 text-sm text-muted-foreground">Teknologi dalam satu template</p>
			</div>
			<div class="bg-card px-6 py-8 sm:py-10">
				<p class="font-mono text-4xl font-bold tracking-tight text-primary sm:text-5xl">100%</p>
				<p class="mt-2 text-sm text-muted-foreground">Type-safe client → server via Eden Treaty</p>
			</div>
			<div class="bg-card px-6 py-8 sm:py-10">
				<p class="font-mono text-4xl font-bold tracking-tight text-primary sm:text-5xl">1</p>
				<p class="mt-2 text-sm text-muted-foreground">
					Perintah verifikasi: <code class="font-mono text-xs">bun run verify</code>
				</p>
			</div>
		</section>

		<!-- Feature cards, a la Svelte -->
		<section id="stack" class="scroll-mt-20 py-16 sm:py-24">
			<p class="text-center text-xs font-medium uppercase tracking-[0.2em] text-primary">Stack</p>
			<h2
				class="mx-auto mt-3 max-w-2xl text-center text-3xl font-bold tracking-tight sm:text-4xl 2xl:text-5xl"
			>
				Fondasi siap pakai, tanpa boilerplate.
			</h2>
			<div class="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{#each stack as [name, description, tag], i}
					<article
						class="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
					>
						<div class="flex items-center justify-between">
							<span class="font-mono text-xs text-muted-foreground/70"
								>{String(i + 1).padStart(2, '0')}</span
							>
							<span
								class="rounded-full bg-muted px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-wider text-muted-foreground"
								>{tag}</span
							>
						</div>
						<h3 class="mt-4 text-lg font-semibold tracking-tight">{name}</h3>
						<p class="mt-1 text-sm leading-6 text-muted-foreground">{description}</p>
					</article>
				{/each}
			</div>
		</section>

		<!-- Code showcase, a la Elysia docs -->
		<section id="code" class="scroll-mt-20 pb-16 sm:pb-24">
			<div class="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
				<div class="text-center lg:text-left">
					<p class="text-xs font-medium uppercase tracking-[0.2em] text-primary">Single source of truth</p>
					<h2 class="mt-3 text-3xl font-bold tracking-tight sm:text-4xl 2xl:text-5xl">
						Satu skema, <span class="text-gradient">semua sinkron.</span>
					</h2>
					<p class="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
						Skema Elysia memvalidasi request saat runtime dan memberi tipe yang sama ke handler
						maupun client Eden Treaty. Ubah satu tempat, seluruh aplikasi ikut — tanpa codegen.
					</p>
					<button
						type="button"
						onclick={goCheckApi}
						disabled={loading}
						class="mt-6 inline-flex h-11 items-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-50"
					>
						{loading ? 'Memeriksa…' : 'Coba endpoint live'}
					</button>
				</div>
				<div class="code-card overflow-hidden rounded-2xl shadow-2xl">
					<div class="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
						<span class="size-2.5 rounded-full bg-[#ff5f57]"></span>
						<span class="size-2.5 rounded-full bg-[#febc2e]"></span>
						<span class="size-2.5 rounded-full bg-[#28c840]"></span>
						<span class="ml-2 font-mono text-xs text-slate-400">server/api/index.ts</span>
					</div>
					<pre
						class="overflow-x-auto p-4 font-mono text-[0.8rem] leading-6 text-slate-200 sm:p-5 sm:text-sm"><code><span class="tok-kw">import</span> <span class="tok-fn">&#123; Elysia, t &#125;</span> <span class="tok-kw">from</span> <span class="tok-str">'elysia'</span>

<span class="tok-kw">export const</span> <span class="tok-fn">app</span> = <span class="tok-kw">new</span> <span class="tok-fn">Elysia</span>()
  .<span class="tok-fn">get</span>(<span class="tok-str">'/health'</span>, () => (&#123; <span class="tok-fn">status</span>: <span class="tok-str">'ok'</span> &#125;), &#123;
    <span class="tok-fn">response</span>: t.<span class="tok-fn">Object</span>(&#123; <span class="tok-fn">status</span>: t.<span class="tok-fn">Literal</span>(<span class="tok-str">'ok'</span>) &#125;),
  &#125;)

<span class="tok-cm">// tipe client mengikuti server</span>
<span class="tok-kw">const</span> &#123; data &#125; = <span class="tok-kw">await</span> <span class="tok-fn">api.health.get</span>()
data.<span class="tok-fn">status</span> <span class="tok-cm">// tipe literal 'ok'</span></code></pre>
				</div>
			</div>
		</section>

		<!-- API status -->
		<section id="api" class="scroll-mt-20 pb-16 sm:pb-24">
			<div class="rounded-2xl border border-border bg-card p-6 sm:p-8">
				<div class="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
					<div>
						<p class="text-xs font-medium uppercase tracking-[0.2em] text-primary">Live check</p>
						<h2 class="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">API health</h2>
						<p class="mt-1 font-mono text-sm text-muted-foreground">
							<span class="rounded bg-muted px-1.5 py-0.5 font-semibold text-emerald-700 dark:text-emerald-400">GET</span>
							/api/health · Elysia
						</p>
					</div>
					<div class="flex items-center gap-4">
						<div class="text-left sm:text-right">
							{#if latency !== null}
								<p class="font-mono text-4xl font-bold tracking-tight">
									{latency}<span class="ml-1 text-base font-normal text-muted-foreground">ms</span>
								</p>
								<p
									class={status === 'success'
										? 'text-sm text-emerald-700 dark:text-emerald-400'
										: 'text-sm text-red-600 dark:text-red-400'}
								>
									{status === 'success' ? 'Beroperasi' : 'Tidak tersedia'}
								</p>
							{:else}
								<p class="font-mono text-4xl font-bold tracking-tight text-muted-foreground">—</p>
								<p class="text-sm text-muted-foreground">Belum dicek</p>
							{/if}
						</div>
						<span class="size-3 shrink-0 rounded-full {statusDot}"></span>
					</div>
				</div>
			</div>
		</section>
	</main>

	<footer class="border-t border-border">
		<div class="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
			<div class="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
				<div class="max-w-xs">
					<a href="#top" class="flex items-center gap-2 font-semibold tracking-tight text-foreground">
						<span
							class="grid size-7 place-items-center rounded-md bg-primary text-sm font-bold text-primary-foreground"
							>S</span
						>
						Svelysia
					</a>
					<p class="mt-3 text-sm leading-6 text-muted-foreground">
						Bersih sejak awal. Fleksibel untuk berkembang.
					</p>
				</div>
				<nav class="flex gap-12 text-sm" aria-label="Navigasi footer">
					<div class="flex flex-col gap-2.5">
						<p class="font-semibold text-foreground">Jelajah</p>
						<a class="text-muted-foreground transition-colors hover:text-foreground" href="#stack">Stack</a>
						<a class="text-muted-foreground transition-colors hover:text-foreground" href="#code">Kode</a>
						<a class="text-muted-foreground transition-colors hover:text-foreground" href="#api">API</a>
					</div>
					<div class="flex flex-col gap-2.5">
						<p class="font-semibold text-foreground">Mulai</p>
						<a class="text-muted-foreground transition-colors hover:text-foreground" href="#code">Lihat kodenya</a>
						<a class="text-muted-foreground transition-colors hover:text-foreground" href="#api">Cek API live</a>
					</div>
				</nav>
			</div>
			<div
				class="mt-8 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row"
			>
				<p>© 2026 Svelysia · <span class="font-mono text-xs">v0.0.1</span></p>
				<p class="flex items-center gap-1.5">
					<span class="size-1.5 rounded-full bg-emerald-500"></span>Siap deploy ke edge
				</p>
			</div>
		</div>
	</footer>
</div>
