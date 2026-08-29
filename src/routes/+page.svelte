<script lang="ts">
	import { api } from '$lib/api/client'
	import { Button } from '$lib/components/ui/button'
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card'

	const stack = [
		['01', 'SvelteKit', 'Application framework'],
		['02', 'Svelte 5', 'UI and runes'],
		['03', 'TypeScript', 'Type safety'],
		['04', 'Tailwind CSS', 'Styling system'],
		['05', 'Elysia', 'API framework'],
		['06', 'Eden Treaty', 'Type-safe API client'],
		['07', 'Cloudflare Workers', 'Runtime and deployment'],
		['08', 'Vitest', 'Testing'],
		['09', 'Oxlint + Oxfmt', 'Code quality'],
	] as const

	let loading = $state(false)
	let status = $state<'idle' | 'success' | 'error'>('idle')
	let latency = $state<number | null>(null)

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
</script>

<svelte:head>
	<title>Svelysia — Minimal web starter</title>
	<meta
		name="description"
		content="Svelysia adalah template minimal untuk membangun website baru dengan stack modern."
	/>
</svelte:head>

<main class="relative isolate min-h-screen overflow-hidden bg-background text-foreground">
	<div class="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,_color-mix(in_oklab,_var(--color-primary)_10%,_transparent),_transparent)]"></div>

	<div class="mx-auto flex min-h-screen w-full max-w-[1600px] flex-col px-6 sm:px-10 lg:px-16 xl:px-24">
		<nav class="flex items-center justify-between border-b border-border/60 py-6" aria-label="Main navigation">
			<a class="flex items-center gap-2.5 font-semibold tracking-tight" href="/">
				<span class="grid size-8 place-items-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">S</span>
				Svelysia
			</a>
			<div class="flex items-center gap-3 text-sm text-muted-foreground">
				<span class="hidden sm:inline">Minimal web starter</span>
				<span class="size-1 rounded-full bg-border"></span>
				<span class="text-emerald-600">v0.0.1</span>
			</div>
		</nav>

		<section class="grid flex-1 items-center gap-16 py-16 lg:grid-cols-[minmax(0,1fr)_minmax(30rem,0.8fr)] lg:gap-24 lg:py-24 xl:gap-32">
			<div class="max-w-3xl">
				<div class="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-primary">
					<span class="size-1.5 rounded-full bg-primary"></span>
					Ready to build
				</div>
				<h1 class="text-5xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
					Mulai lebih cepat.<br /><span class="text-muted-foreground">Bangun lebih baik.</span>
				</h1>
				<p class="mt-7 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
					Svelysia adalah fondasi minimal untuk website baru. Semua setup penting sudah tersedia, sehingga
					Anda bisa fokus membangun produk—bukan mengulang konfigurasi.
				</p>
				<div class="mt-9 flex flex-wrap items-center gap-4">
					<Button class="h-11 rounded-xl bg-primary px-6 text-base font-semibold shadow-lg shadow-primary/20 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/25" size="lg" onclick={checkApi} disabled={loading}>
						{loading ? 'Checking API…' : 'Check API'}
					</Button>
					<span class="text-sm text-muted-foreground">atau mulai edit <code class="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">src/routes</code></span>
				</div>
				<Card class="mt-7 max-w-md border-border/70 bg-card/70 shadow-sm">
					<CardContent class="flex items-center justify-between gap-6 p-4">
						<div class="flex items-center gap-3">
							<span class="grid size-9 place-items-center rounded-full bg-emerald-500/10 text-emerald-600">
								<span class="size-2 rounded-full bg-emerald-500"></span>
							</span>
							<div>
								<p class="text-sm font-medium">API health</p>
								<p class="text-xs text-muted-foreground">GET /api/health · Elysia</p>
							</div>
						</div>
						<div class="text-right">
							{#if latency !== null}
								<p class="font-mono text-2xl font-semibold tracking-tight">{latency}<span class="ml-1 text-sm font-normal text-muted-foreground">ms</span></p>
								<p class={status === 'success' ? 'text-xs text-emerald-600' : 'text-xs text-destructive'}>
									{status === 'success' ? 'Operational' : 'Unavailable'}
								</p>
							{:else}
								<p class="font-mono text-2xl font-semibold tracking-tight text-muted-foreground">—</p>
								<p class="text-xs text-muted-foreground">Not checked</p>
							{/if}
						</div>
					</CardContent>
				</Card>
			</div>

			<div class="grid gap-4">
				<Card class="border-border/70 bg-card/80 shadow-xl shadow-primary/5 backdrop-blur">
					<CardHeader class="gap-2 border-b border-border/60 pb-5">
						<p class="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-muted-foreground">The foundation</p>
						<CardTitle class="text-2xl tracking-tight">Semua yang dibutuhkan.</CardTitle>
						<CardDescription>Fondasi siap pakai, tanpa boilerplate yang tidak perlu.</CardDescription>
					</CardHeader>
					<CardContent class="grid gap-2 pt-5 sm:grid-cols-2 lg:grid-cols-1">
						{#each stack as [number, name, description]}
							<div class="group flex items-center gap-3 rounded-lg border border-border/60 bg-background/50 px-3 py-2.5 transition-colors hover:border-primary/30 hover:bg-primary/[0.03]">
								<span class="grid size-6 shrink-0 place-items-center rounded-md bg-muted font-mono text-[0.6rem] font-medium text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary">{number}</span>
								<div class="min-w-0">
									<p class="text-sm font-medium">{name}</p>
									<p class="text-xs text-muted-foreground">{description}</p>
								</div>
							</div>
						{/each}
					</CardContent>
				</Card>

			</div>
		</section>

		<footer class="flex flex-col gap-3 border-t border-border/60 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
			<p>Clean by default. Flexible by design.</p>
			<div class="flex items-center gap-2">
				<span class="size-1.5 rounded-full bg-emerald-500"></span>
				<span>Cloudflare ready</span>
			</div>
		</footer>
	</div>
</main>
