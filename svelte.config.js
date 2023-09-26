import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter()
	},
	css: {
		global: [
			// Include the GrapesJS CSS from the static directory
			'static/grapes.min.css'
		]
	},
	preprocess: vitePreprocess()
};
export default config;
