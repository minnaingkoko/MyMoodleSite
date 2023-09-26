<!-- src/routes/GrapesJS.svelte -->

<script>
	import { getHTML,getCSS } from '../templates/template_one/index.js';
	import { fetchMoodleCourses, fetchCourseImage } from '../lib/api/moodleIntegration';
	import { onMount, onDestroy } from 'svelte';
	import plugin from 'grapesjs-blocks-basic';
	import gjsForms from 'grapesjs-plugin-forms';
	let editor;

	let courses = [];

	const myNewComponentTypes = (editor) => {
		editor.DomComponents.addType('my-input-type', {
			// Make the editor understand when to bind `my-input-type`
			isComponent: (el) => el.tagName === 'INPUT',

			// Model definition
			model: {
				// Default properties
				defaults: {
					tagName: 'input',
					draggable: 'form, form *', // Can be dropped only inside `form` elements
					droppable: false, // Can't drop other elements inside
					attributes: {
						// Default attributes
						type: 'text',
						name: 'default-name',
						placeholder: 'Insert text here'
					},
					traits: ['name', 'placeholder', { type: 'checkbox', name: 'required' }]
				}
			}
		});
	};

	function purify(html) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    }

	onMount(async () => {
		try {
			courses = await fetchMoodleCourses();
			// console.log(courses);
		} catch (error) {
			// Handle the error, e.g., show an error message to the user
			console.error('Error:', error);
		}
		// Import GrapesJS
		import('grapesjs').then(async (grapesjs) => {
			let htmlContent = await getHTML();
			let cssContent = await getCSS();
			// Initialize GrapesJS
			editor = grapesjs.init({
				container: '#gjs',
				plugins: [myNewComponentTypes, plugin, gjsForms],
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
				// Add any other GrapesJS configuration options here
			});

			// ----- COMPONENTS ----- //

			// Get DomComponents module
			var comps = editor.DomComponents;

			// custom section component
			comps.addType('custom_section', {
				// isComponent: el => false,
				isComponent(el) {
					if (el && el.classList.contains('custom-section')) {
						// console.log(el, el.attributes, el.classList.contains('custom-section'));
						return { type: 'custom_section' };
					}
				},

				model: {
					defaults: {
						tagName: 'div',
						droppable: true,
						editable: true,
						selectable: true,
						attributes: {
							title: 'true',
							id: 'section'
						},

						// set default trait option
						sectionColorClass: 'bg-success',

						// traits
						traits: [
							// section bg class select
							{
								type: 'select',
								label: 'Background colour',
								name: 'sectionColorClass',
								options: [
									{ value: 'bg-primary', name: 'Primary' },
									{ value: 'bg-secondary', name: 'Secondary' },
									{ value: 'bg-success', name: 'Success' },
									{ value: 'bg-danger', name: 'Danger' },
									{ value: 'bg-warning', name: 'Warning' },
									{ value: 'bg-info', name: 'Info' },
									{ value: 'bg-light', name: 'Light' },
									{ value: 'bg-dark', name: 'Dark' },
									{ value: 'bg-white', name: 'White' },
									{ value: 'bg-transparent', name: 'Transparent' }
								],
								changeProp: 1
							}
						]
					}
				},

				view: {
					events: {
						click: function (e) {
							// console.log('component: click');
						}
					},

					init() {
						// listen to model changes
						this.listenTo(
							this.model,
							'change:sectionColorClass',
							this.sectionUpdateClassesCallback
						);

						// set default values
						this.sectionUpdateClassesCallback();

						// console.log('component: init');
					},

					sectionUpdateClassesCallback() {
						// set classes - TODO: currently removes any classes created in editor
						this.model.setClass(
							'grapes-custom-component custom-section ' + this.model.get('sectionColorClass')
						);
						// console.log('component: set classes callback');
					}
				}
			});

			// console.log(comps);
			// console.log(comps.getType('custom_section')); // custom type exists

			// ----- BLOCKS ----- //

			editor.BlockManager.add('section-block', {
				label: 'Section',
				category: 'Section',
				attributes: {
					class: 'fa fa-square'
				},
				content: {
					type: 'custom_section'
				}
				// content: '<div data-gjs-type="custom_section" class="custom-section" title="eee"></div>' // isComponent is ignored if type is set via attribute here // data-gjs-type="custom_section"
			});

			editor.BlockManager.add('section-block-collection', {
				label: 'Section collection',
				category: 'Testing',
				attributes: {
					class: 'fa fa-square'
				},
				content:
					'<section>' +
					'<p>Paragraph example</p>' +
					'<a>Link example</a>' +
					'<div data-gjs-type="custom_section" class="custom-section" title="eee"></div>' + // isComponent is ignored if type is set via attribute here // data-gjs-type="custom_section"
					'</section>'
			});

			// Listen for the editor load event
			editor.on('load', () => {
				// console.log('Editor loaded', { editor });
			});
		});
	});

	onDestroy(() => {
		// Clean up the GrapesJS instance when the component is destroyed
		if (editor) {
			editor.destroy();
		}
	});
</script>

<div id="gjs" />


<style>
	/* Define your GrapesJS container style here */
	#gjs {
		height: 100vh;
	}
</style>
