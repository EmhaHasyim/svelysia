<script lang="ts">
	import { page } from '$app/state'
</script>

<svelte:head>
	<title>{page.status} — Svelysia</title>
</svelte:head>

<div class="min-h-screen bg-background text-foreground antialiased">
	<main class="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center px-4 text-center sm:px-6">
		<p class="font-mono text-sm text-muted-foreground">{page.status}</p>
		<h1 class="mt-4 text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[1.02] tracking-tight">
			{#if page.status === 404}
				Halaman tidak ditemukan.
			{:else}
				Terjadi kesalahan.
			{/if}
		</h1>
		<p class="mt-4 text-sm leading-6 text-muted-foreground">
			{#if page.status === 404}
				Alamat yang kamu buka tidak ada. Mungkin sudah dipindahkan atau salah ketik.
			{:else}
				Server gagal memproses permintaan. Coba lagi sebentar lagi.
			{/if}
		</p>
		<a
			href="/"
			class="mt-10 inline-flex h-11 items-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5"
		>
			Kembali ke beranda
		</a>
		<p class="mt-6 font-mono text-xs text-muted-foreground">{page.error?.message}</p>
	</main>
</div>
