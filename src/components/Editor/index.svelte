<script>
	// Import necessary modules and components
	import { getHTML, getCSS } from '../../templates/template_one/index.js';
	import { onMount, onDestroy } from 'svelte';
	import plugin from 'grapesjs-blocks-basic';
	import gjsForms from 'grapesjs-plugin-forms';
	import placeholder from '$lib/images/placeholder.jpg';
	import Loading from './loading.svelte';
	let editor;
	let isLoading = true; // Flag to track loading state

	onMount(async () => {
		// Initialize GrapeJS asynchronously
		try {
			const grapesjs = await import('grapesjs');
			let htmlContent = await getHTML();
			let cssContent = await getCSS();

			editor = grapesjs.init({
				container: '#gjs',
				plugins: [plugin, gjsForms],
				pluginsOpts: {
					[plugin]: {
						/* options */
					},
					[gjsForms]: {
						/* options for gjsForms plugin */
					}
				},
				height: '100vh',
				storageManager: false,
				components: htmlContent,
				style: cssContent
			});

			// Once GrapeJS is initialized, set isLoading to false
			isLoading = false;
		} catch (error) {
			// Handle any initialization error here
			console.error('Error initializing GrapeJS:', error);
		}

		// Define a custom block for GrapesJS
		editor.BlockManager.add('moodle_course', {
			label: 'Course',
			category: 'Courses',
			attributes: {
				class: 'fa fa-square'
			},
			content: `
			<div style="background-color: white; height: 300px; width: 300px; margin-bottom: 30px; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2); border-radius: 2px; transition: all 0.5s ease; font-weight: 100; overflow: hidden;" class="card">
			  <img src=${[
					placeholder
				]} alt="course" style="width: 100%; object-fit: cover; height: 155px;" class="card-header" />
			  <div style="padding: 15px 15px 5px 15px; color: #555;" class="card-body">
				<div style="font-size: 1.4em; margin-bottom: 5px;" class="card-title">This is a title</div>
				<div style="font-size: 0.85rem; line-height: 17px;" class="card-desc">This is a description</div>
			  </div>
			</div>
		  `
		});

		// Listen for the editor load event
		editor.on('load', () => {
			// You can add custom actions when the editor is loaded
			// console.log('Editor loaded', { editor });
		});
	});

	onDestroy(() => {
		// Clean up the GrapesJS instance when the component is destroyed
		if (editor) {
			editor.destroy();
		}
	});
</script>

<!-- Display the loading screen while isLoading is true -->
{#if isLoading}
	<Loading message="Initializing Editor..." />	
{/if}
<div id="gjs" />

<style>
	/* Define your GrapesJS container style here */
	#gjs {
		height: 100vh;
	}
</style>
