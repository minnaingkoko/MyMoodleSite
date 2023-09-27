<script>
	// Import necessary Svelte components, data stores, and assets
	import Header from '../Shared/Header.svelte';
	import Footer from '../Shared/Footer.svelte';
	import { course_data, image_data } from '../../stores/dataStore.js';
	import placeholder from '$lib/images/placeholder.jpg';

	// Function to remove HTML tags from a string
	function purify(html) {
		const parser = new DOMParser();
		const doc = parser.parseFromString(html, 'text/html');
		return doc.body.textContent || '';
	}
</script>

<main class="font-sans bg-gray-100 text-gray-700">
    <!-- Include the Header component -->
    <Header />
  
    <!-- Course Categories Section -->
    <section class="text-center py-8">
      <h2 class="text-2xl mb-4">Explore Our Courses</h2>
      <div class="flex justify-center">
        <a href="/courses?category=science" class="text-blue-500 font-bold hover:text-blue-700 mx-4">Science</a>
        <a href="/courses?category=arts" class="text-blue-500 font-bold hover:text-blue-700 mx-4">Arts</a>
        <a href="/courses?category=technology" class="text-blue-500 font-bold hover:text-blue-700 mx-4">Technology</a>
        <!-- Add more categories as needed -->
      </div>
    </section>
  
    <!-- Course Listings Section -->
    <section class="flex justify-around flex-wrap py-12">
      <!-- Loop through the course data to render course cards -->
      {#each $course_data as course, index (course.id)}
        {#if course.id !== 1}
          <!-- Course Card Container -->
          <div class="bg-white border border-gray-300 rounded-lg p-6 max-w-xs flex flex-col justify-between mb-8">
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
                href="/#"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out inline-block"
              >Enroll</a>
            </div>
          </div>
        {/if}
      {/each}
  
      <!-- Display a message if no courses are available -->
      {#if $course_data.length === 0}
        <p class="text-gray-700">No courses available.</p>
      {/if}
    </section>
  
    <!-- Include the Footer component -->
    <Footer />
  </main>
  
