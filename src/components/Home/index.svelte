<script>
	// Import Svelte components and data stores
    import Header from '../Shared/Header.svelte'
    import Footer from '../Shared/Footer.svelte'
	import { course_data, image_data } from '../../stores/dataStore.js'
	import placeholder from '$lib/images/placeholder.jpg';

	// Function to remove HTML tags from a string
	function purify(html) {
		const parser = new DOMParser();
		const doc = parser.parseFromString(html, 'text/html');
		return doc.body.textContent || '';
	}

	// Import Svelte's `onMount` function
	import { onMount } from 'svelte';

	// Import API functions for fetching course data and images
	import {
		fetchMoodleCourses,
		fetchCourseImages,
		fetchCourseImage
	} from '../../lib/api/moodleIntegration.js'

	let temp;

	// Run code when the component is mounted
	onMount(async () => {
		try {
			// Fetch Moodle courses and set them in the data store
			temp = await fetchMoodleCourses();
			course_data.set(temp);
			console.log($course_data);

			// Fetch course data and images for each course except course id 1
			for (const course of $course_data) {
				if (course.id !== 1) {
					const imageData = await fetchCourseImages(course.shortname);
					if (imageData.courses[0].overviewfiles.length > 0) {
						// Fetch the course image and update the image_data store
						temp = await fetchCourseImage(imageData.courses[0].overviewfiles[0].fileurl);
						image_data.update((arr) => [...arr, temp]);
					} else {
						// If there is no image, update image_data with 'none'
						image_data.update((arr) => [...arr, 'none']);
					}
				}
			}

			console.log($image_data);
		} catch (error) {
			// Handle errors, e.g., show an error message to the user
			console.error('Error:', error);
		}
	});
</script>

<main class="font-sans bg-gray-100 text-gray-700">
	<Header />

	<!-- Hero Section -->
	<section
		class="bg-cover bg-center bg-no-repeat text-white py-16"
		style="background-image: url('/src/lib/images/hero-background.jpg');"
	>
		<div class="text-center">
			<h1 class="text-4xl font-bold mb-4">Welcome to Our E-Learning Platform</h1>
			<p class="text-xl mb-8">Start your learning journey today!</p>
			<a
				href="/courses"
				class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out inline-block"
				>Explore Courses</a
			>
		</div>
	</section>

	<!-- About Us Section -->
	<section class="bg-white py-8">
		<div class="container mx-auto text-center">
			<h2 class="text-2xl mb-4">About Us</h2>
			<p class="text-gray-700">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget condimentum tortor. Nulla
				facilisi.
			</p>
		</div>
	</section>

	<!-- Featured Courses Section -->
	<section class="bg-gray-100 py-12">
		<div class="container mx-auto flex flex-wrap justify-center gap-6">
			{#if $course_data.length > 0}
				{#each $course_data as course, index (course.id)}
					{#if course.id !== 1}
						<!-- Course Card Container -->
						<div
							class="bg-white border border-gray-300 rounded-lg p-6 max-w-xs flex flex-col justify-between"
						>
							<div>
								<h3 class="text-xl font-semibold mb-2">{course.fullname}</h3>
								{#if $image_data[index - 1] !== 'none'}
									<img
										src={$image_data[index - 1]}
										alt="course"
										class="w-full h-40 object-cover mb-2"
										loading="lazy"
									/>
								{:else}
									<img
										src={placeholder}
										alt="course"
										class="w-full h-40 object-cover mb-2"
										loading="lazy"
									/>
								{/if}
								<p class="text-gray-600 mb-2">{purify(course.summary)}</p>
							</div>
							<!-- Button Container -->
							<div class="mt-4">
								<a
									href="/courses"
									class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out inline-block"
									>Learn More</a
								>
							</div>
						</div>
					{/if}
				{/each}
			{:else}
				<p class="text-gray-700">No courses available.</p>
			{/if}
		</div>
	</section>

	<!-- Testimonials Section -->
	<section class="bg-gray-100 py-12">
		<div class="container mx-auto flex justify-center space-x-8">
			<div class="bg-white p-6 border border-gray-300 rounded-lg shadow-md max-w-xs text-center">
				<blockquote class="text-lg mb-4">
					"I learned so much from this platform. Highly recommended!"
				</blockquote>
				<cite class="italic">- Happy Learner</cite>
			</div>
			<div class="bg-white p-6 border border-gray-300 rounded-lg shadow-md max-w-xs text-center">
				<blockquote class="text-lg mb-4">
					"The instructors are excellent, and the content is top-notch."
				</blockquote>
				<cite class="italic">- Satisfied Student</cite>
			</div>
		</div>
	</section>

	<Footer />
</main>
