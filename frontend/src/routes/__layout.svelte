<script lang="ts">
	import { navigating } from '$app/stores';
	import { loading } from '$lib/store/loadingStore';
	import { notificationData } from '$lib/store/notificationStore';
	import { fly } from 'svelte/transition';

	import Header from '../components/Header/Header.svelte';
	import Loader from '../components/Loader/Loader.svelte';

	import '../dist/css/style.min.css';

	$: loading.setNavigate(!!$navigating);
	$: loading.setLoading(!!$navigating, 'Loading, please wait...');
</script>

<Header />

{#if $notificationData}
	<p
		class="notification"
		id="notification"
		in:fly={{ x: 200, duration: 500, delay: 500 }}
		out:fly={{ x: 200, duration: 500 }}
	>
		{$notificationData}
	</p>
{/if}

<main>
	<Loader />
	<slot />
</main>

<footer in:fly={{ y: -50, duration: 500, delay: 500 }} out:fly={{ duration: 500 }}>
	<p>
		Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit. Coded by
		<a href="https://github.com/Sirneij/">John O. Idogun</a>.
	</p>
</footer>
