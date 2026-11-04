<script lang="ts">
	import { page } from '$app/state'
</script>

<svelte:head>
	<title>{page.status} — Svelysia</title>
</svelte:head>

<div class="min-h-screen" style="background: var(--color-bg); color: var(--color-text)">
	<main id="main" class="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center px-4 text-center sm:px-6">
		<p class="font-mono text-sm" style="color: var(--color-text-muted)">{page.status}</p>
		<h1 class="mt-4 text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[1.02] tracking-tight">
			{#if page.status === 404}
				Halaman tidak ditemukan.
			{:else}
				Terjadi kesalahan.
			{/if}
		</h1>
		<p class="mt-4 text-sm leading-6" style="color: var(--color-text-muted)">
			{#if page.status === 404}
				Alamat yang kamu buka tidak ada. Mungkin sudah dipindahkan atau salah ketik.
			{:else}
				Server gagal memproses permintaan. Coba lagi sebentar lagi.
			{/if}
		</p>
		<a
			href="/"
			class="btn-primary mt-10 inline-flex h-11 items-center rounded-full px-6 text-sm font-semibold transition duration-75"
		>
			Kembali ke beranda
		</a>
		
	</main>
</div>
