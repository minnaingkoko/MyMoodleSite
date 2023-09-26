<script>
	// Define the properties that CourseCard expects
	export let courseTitle;
	export let instructor;
	export let description;
	export let imageUrl;
</script>

<div class="course-card">
	<img src={imageUrl} alt={courseTitle} />
	<h3>{courseTitle}</h3>
	<p>Instructor: {instructor}</p>
	<p>{description}</p>
	<button>Enroll</button>
</div>

<style>
	/* Add your CourseCard styles here */
</style>
