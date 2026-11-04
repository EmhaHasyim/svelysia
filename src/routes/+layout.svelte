<script lang="ts">
	import './layout.css'

	let { children } = $props()
</script>

<a href="#main" class="sr-only focus:not-sr-only">Lewati ke konten</a>
	{@render children()}
