<script lang="ts">
	import Header from '../components/Header/Header.svelte';
	import '../dist/css/style.min.css';
</script>

<Header />

<main>
	<slot />
</main>

<footer>
	<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
</footer>
