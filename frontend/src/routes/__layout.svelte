<script lang="ts">
	import { notificationData } from '../store/notificationStore';

	import Header from '../components/Header/Header.svelte';
	import '../dist/css/style.min.css';
	import { fly } from 'svelte/transition';
	const timeout = setTimeout(() => {
		console.log('fired!');

		notificationData.set('');
	}, 500);

	clearTimeout(timeout);

	$: console.log($notificationData);
</script>

<Header />

{#if $notificationData}
	<p
		class="notification"
		in:fly={{ x: -200, duration: 500, delay: 500 }}
		out:fly={{ x: 200, duration: 500 }}
	>
		{$notificationData}
	</p>
{/if}

<main>
	<slot />
</main>

<footer>
	<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
</footer>
