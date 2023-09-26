<script>
	import Header from '../components/Header.svelte';
	import Footer from '../components/Footer.svelte';
	import { course_data, image_data } from '../stores/dataStore';
	import placeholder from '$lib/images/placeholder.jpg';

	function purify(html) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    }

	import { onMount } from 'svelte';
	import { fetchMoodleCourses, fetchCourseImages, fetchCourseImage } from '../lib/api/moodleIntegration';

	let temp;

	onMount(async () => {
		try {
			temp = await fetchMoodleCourses();
			course_data.set(temp);
			console.log($course_data)

			// Fetch course data and images for each course except course id 1
			for (const course of $course_data) {
				if (course.id !== 1) {
					const imageData = await fetchCourseImages(course.shortname);
					if(imageData.courses[0].overviewfiles.length > 0){
						temp = await fetchCourseImage(imageData.courses[0].overviewfiles[0].fileurl);
						image_data.update(arr => [...arr, temp]);
					}
					else{
						image_data.update(arr => [...arr, 'none']);
					}
				}
			}

			console.log($image_data);
		} catch (error) {
			// Handle the error, e.g., show an error message to the user
			console.error('Error:', error);
		}
	});
</script>

<!-- HTML Template -->
<main>
	<Header />

	<!-- Hero Section -->
	<section class="hero">
		<div class="hero-content">
			<h1>Welcome to Our E-Learning Platform</h1>
			<p>Start your learning journey today!</p>
			<a href="/courses" class="cta-button">Explore Courses</a>
		</div>
		<!-- You can add a background image or video here -->
	</section>

	<!-- About Us Section -->
	<section class="about">
		<div class="about-content">
			<h2>About Us</h2>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget condimentum tortor. Nulla
				facilisi.
			</p>
		</div>
	</section>

	<!-- Featured Courses Section -->

	<section class="featured-courses">
		{#if $course_data.length > 0}
		{#each $course_data as course, index  (course.id)}
		{#if course.id !== 1}
		<div class="course-card">
		<h3>{course.fullname}</h3>
			{#if $image_data[index-1] !== 'none'}
				 <img src={$image_data[index-1]} alt="course">
			{:else}
				<img src={placeholder} alt="course">
			{/if}
		  <p>{purify(course.summary)}</p>
		  <a href="/courses" class="alt-button">Learn More</a>
		</div>
		{/if}
		{/each}
		{:else}
		<p>No courses available.</p>
		{/if}
	  </section>

	<!-- Testimonials Section -->
	<section class="testimonials">
		<div class="testimonial">
			<blockquote>"I learned so much from this platform. Highly recommended!"</blockquote>
			<cite>- Happy Learner</cite>
		</div>

		<div class="testimonial">
			<blockquote>"The instructors are excellent, and the content is top-notch."</blockquote>
			<cite>- Satisfied Student</cite>
		</div>
	</section>

	<Footer />
</main>

<style>
	/* Global styles that apply to all routes */
	main {
		font-family: Arial, sans-serif;
		background-color: #f5f5f5;
		color: #333;
	}

	/* Hero Section Styles */
	.hero {
		background: url('/src/lib/images/hero-background.jpg') center/cover no-repeat;
		color: #fff;
		text-align: center;
		padding: 4rem 0;
	}

	.hero h1 {
		font-size: 2.5rem;
		margin-bottom: 1rem;
	}

	.hero p {
		font-size: 1.25rem;
		margin-bottom: 2rem;
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

	/* About Us Section Styles */
	.about {
		padding: 2rem;
		background-color: #fff;
	}

	.about h2 {
		font-size: 1.5rem;
		margin-bottom: 1rem;
	}

	/* Featured Courses Section Styles */
    .featured-courses {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding: 2rem;
    }

    .course-card {
      background-color: #fff;
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 1rem;
      margin: 1rem;
      width: 350px; /* Adjust the width to occupy 1/3 of the container width */
      box-sizing: border-box; /* Ensure padding and border are included in the width calculation */
    }

    .course-card img {
      width: 350px;
      height: 250px;
	  object-fit: cover;
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

	.alt-button {
      display: block;
      text-align: center;
      background-color: #007bff;
      color: #fff;
      padding: 0.5rem 1rem;
      text-decoration: none;
      border-radius: 4px;
      transition: background-color 0.3s ease-in-out;
    }

    .alt-button:hover {
      background-color: #0056b3; /* Darker shade on hover */
    }


	/* Testimonials Section Styles */
	.testimonials {
		display: flex;
		justify-content: space-around;
		padding: 2rem;
		background-color: #f5f5f5;
	}

	.testimonial {
		background-color: #fff;
		padding: 1.5rem;
		border-radius: 4px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		max-width: 300px;
		text-align: center;
	}

	.testimonial blockquote {
		font-size: 1.125rem;
		margin-bottom: 1rem;
	}

	.testimonial cite {
		font-size: 1rem;
		font-style: italic;
	}

	/* Add any additional styles as needed */
</style>
