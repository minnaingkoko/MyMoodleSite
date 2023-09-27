// moodleIntegration.js
export async function fetchMoodleCourses() {
	const requestOptions = {
		method: 'POST',
		redirect: 'follow'
	};

	const url =
		'https://minnaingkoko.com/webservice/rest/server.php' +
		'?wstoken=d5ab3c2e8f3ea59d3a2534f568031d28' +
		'&wsfunction=core_course_get_courses' +
		'&moodlewsrestformat=json';

	try {
		const response = await fetch(url, requestOptions);
		if (!response.ok) {
			throw new Error('Failed to fetch courses');
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error:', error);
		throw error;
	}
}

export async function fetchCourseImages(shortname) {
	const requestOptions = {
		method: 'POST',
		redirect: 'follow'
	};

	const url = `https://minnaingkoko.com/webservice/rest/server.php?wstoken=d5ab3c2e8f3ea59d3a2534f568031d28&wsfunction=core_course_get_courses_by_field&moodlewsrestformat=json&field=shortname&value=${shortname}`;

	try {
		const response = await fetch(url, requestOptions);
		if (!response.ok) {
			throw new Error('Failed to fetch courses');
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error:', error);
		throw error;
	}
}

export async function fetchCourseImage(imageUrl) {
	const requestOptions = {
		method: 'GET',
		redirect: 'follow'
	};

	let image; // Store the image URL here

	const url = `${imageUrl}?token=d5ab3c2e8f3ea59d3a2534f568031d28`;

	return url;
}
