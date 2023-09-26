// moodleIntegration.js
export async function fetchMoodleCourses() {
	const requestOptions = {
		method: 'POST',
		redirect: 'follow'
	};

	const url =
		'http://localhost/MyMoodleSite/webservice/rest/server.php' +
		'?wstoken=645e549dd644a5d2ad79b0150e519a61' +
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

	const url =
		`http://localhost/MyMoodleSite/webservice/rest/server.php?wstoken=645e549dd644a5d2ad79b0150e519a61&wsfunction=core_course_get_courses_by_field&moodlewsrestformat=json&field=shortname&value=${shortname}`;

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


	const url =
		`${imageUrl}?token=645e549dd644a5d2ad79b0150e519a61`;

	return url;
}
