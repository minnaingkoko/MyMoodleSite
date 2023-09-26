<script>
	import course1 from '$lib/images/course1.jpg';
	import course2 from '$lib/images/course2.jpg';
	import Header from '../../components/Header.svelte';
	import Footer from '../../components/Footer.svelte';

	import { onMount } from 'svelte';
	import { fetchMoodleCourses } from '../../lib/api/moodleIntegration';

	let courses = [];

	onMount(async () => {
		try {
			courses = await fetchMoodleCourses();
		} catch (error) {
			// Handle the error, e.g., show an error message to the user
			console.error('Error:', error);
		}
	});
</script>

<!-- HTML Template -->
<main>
	<Header />

	<!-- Course Categories -->
	<section class="course-categories">
		<h2>Explore Our Courses</h2>
		<div class="categories-list">
			<a href="/courses?category=science">Science</a>
			<a href="/courses?category=arts">Arts</a>
			<a href="/courses?category=technology">Technology</a>
			<!-- Add more categories as needed -->
		</div>
	</section>

	<!-- Course Listings -->
	<section class="course-listings">
		<div class="course-card">
			<img src={course1} alt="Course 1" />
			<h3>Course 1 Title</h3>
			<p>Instructor: John Doe</p>
			<p>Description: A great course for beginners.</p>
			<a href="/courses/course3" class="cta-button">Enroll</a>
		</div>

		<div class="course-card">
			<img src={course2} alt="Course 2" />
			<h3>Course 2 Title</h3>
			<p>Instructor: Jane Smith</p>
			<p>Description: Dive deep into this advanced course.</p>
			<a href="/courses/course4" class="cta-button">Enroll</a>
		</div>
		<!-- Add more course cards as needed -->
	</section>

	<Footer />
</main>

<style>
	/* Global styles that apply to all routes (you can share styles with Home route) */
	main {
		font-family: Arial, sans-serif;
		background-color: #f5f5f5;
		color: #333;
	}

	/* Course Categories Styles */
	.course-categories {
		text-align: center;
		padding: 2rem 0;
	}

	.course-categories h2 {
		font-size: 2rem;
		margin-bottom: 2rem;
	}

	.categories-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		justify-content: center;
	}

	.categories-list a {
		text-decoration: none;
		color: #007bff;
		font-weight: bold;
		margin: 0 1rem;
		transition: color 0.2s ease;
	}

	.categories-list a:hover {
		color: #0056b3;
	}

	/* Course Listings Styles */
	.course-listings {
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
		padding: 2rem;
	}

	.course-card {
		background-color: #fff;
		border: 1px solid #ddd;
		border-radius: 4px;
		padding: 1rem;
		margin: 1rem;
		width: 300px;
	}

	.course-card img {
		max-width: 100%;
		height: auto;
		margin-bottom: 1rem;
	}

	.course-card h3 {
		font-size: 1.25rem;
		margin-bottom: 0.5rem;
	}

	.course-card p {
		font-size: 1rem;
		margin-bottom: 1rem;
	}

	.cta-button {
		background-color: #007bff;
		color: #fff;
		padding: 0.5rem 1rem;
		text-decoration: none;
		border-radius: 4px;
		font-weight: bold;
		transition: background-color 0.2s ease;
	}

	.cta-button:hover {
		background-color: #0056b3;
	}

	/* Add any additional styles as needed */
</style>
