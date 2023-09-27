<!-- Loading.svelte -->
<script>
	export let message = 'Loading...';
</script>

<div class="loading">
	<p>{message}</p>
</div>

<style>
	/* Add styles for the loading screen here */
	.loading {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		background-color: #fff;
	}
</style>
