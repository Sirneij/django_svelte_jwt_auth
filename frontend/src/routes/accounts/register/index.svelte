<script lang="ts">
</script>

<svelte:head>
	<title>Register</title>
</svelte:head>

<section class="container">
	<h1>Register</h1>
	<form class="form">
		<input type="email" aria-label="Email address" placeholder="Email address" />
		<input type="text" aria-label="Username" placeholder="Username" />
		<input type="text" aria-label="Full name" placeholder="Full name" />
		<input type="text" aria-label="Brief bio" placeholder="Tell us about yourself..." />
		<input type="password" aria-label="password" placeholder="password" />
		<input type="password" aria-label="Confirm password" placeholder="Confirm password" />
		<button class="btn" type="submit">Register</button>
	</form>
</section>
