<script lang="ts">
	import { notificationData } from '../store/notificationStore';
	import { fly } from 'svelte/transition';

	import Header from '../components/Header/Header.svelte';

	import '../dist/css/style.min.css';
</script>

<Header />

{#if $notificationData}
	<div class="notification-container">
		<p
			class="notification"
			in:fly={{ x: 200, duration: 500, delay: 500 }}
			out:fly={{ x: 200, duration: 500 }}
		>
			{$notificationData}
		</p>
	</div>
{/if}

<main>
	<slot />
</main>

<footer>
	<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
</footer>
