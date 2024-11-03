import { transformPost } from '../transformers';

export const getPosts = async (page, limit) => {
	try {
		const response = await fetch(
			`http://localhost:3005/posts?_page=${page}&_limit=${limit}`,
		);
		if (!response.ok) throw new Error(`Error: ${response.status}`);

		const loadedPosts = await response.json();
		const links = response.headers.get('Link');

		return {
			posts: loadedPosts ? loadedPosts.map(transformPost) : [],
			links,
		};
	} catch (error) {
		console.error('Fetch failed', error);
		return { posts: [], links: null };
	}
};
