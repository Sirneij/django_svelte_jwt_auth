<script lang="ts">
	import { loading } from '$lib/store/loadingStore';

	$: if ($loading.status === 'NAVIGATING') {
		setTimeout(() => {
			if ($loading.status === 'NAVIGATING') {
				$loading.status = 'LOADING';
			}
		}, 100);
	}
</script>

{#if $loading.status === 'LOADING'}
	<div class="loader-container">
		<div class="loader" />
		{#if $loading.message}
			<p>{$loading.message}</p>
		{/if}
	</div>
{/if}

<style>
	:root {
		--size: 80px;
	}
	.loader-container {
		position: fixed;
		top: 3rem;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #b9c6d2;
		background: linear-gradient(180deg, #d0dde9 3%, #edf0f8 41.35%);
		z-index: 2;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.loader {
		--b: 20px; /* border thickness */
		--n: 15; /* number of dashes*/
		--g: 7deg; /* gap  between dashes*/
		--c: #ff3e00; /* the color */

		width: var(--size); /* size */
		aspect-ratio: 1;
		border-radius: 50%;
		padding: 1px; /* get rid of bad outlines */
		background: conic-gradient(#0000, var(--c)) content-box;
		-webkit-mask: /* we use +/-1deg between colors to avoid jagged edges */ repeating-conic-gradient(
				#0000 0deg,
				#000 1deg calc(360deg / var(--n) - var(--g) - 1deg),
				#0000 calc(360deg / var(--n) - var(--g)) calc(360deg / var(--n))
			),
			radial-gradient(farthest-side, #0000 calc(98% - var(--b)), #000 calc(100% - var(--b)));
		mask: repeating-conic-gradient(
				#0000 0deg,
				#000 1deg calc(360deg / var(--n) - var(--g) - 1deg),
				#0000 calc(360deg / var(--n) - var(--g)) calc(360deg / var(--n))
			),
			radial-gradient(farthest-side, #0000 calc(98% - var(--b)), #000 calc(100% - var(--b)));
		-webkit-mask-composite: destination-in;
		mask-composite: intersect;
		animation: load 1s infinite steps(var(--n));
	}
	p {
		line-height: 1.5;
		font-weight: 700;
		color: rgba(0, 0, 0, 0.7);
	}
	@keyframes load {
		to {
			transform: rotate(1turn);
		}
	}
</style>
