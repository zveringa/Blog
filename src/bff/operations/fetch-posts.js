import { getComments, getPosts } from '../api';
import { getCommentsCount } from '../utils';

export const fetchPosts = async (page, limit) => {
	try {
		const [{ posts, links }, comments] = await Promise.all([
			getPosts(page, limit),
			getComments(),
		]);

		console.log(links);

		return {
			error: null,
			res: {
				posts: posts.map((post) => ({
					...post,
					commentsCount: getCommentsCount(comments, post.id),
				})),
				links,
			},
		};
	} catch (error) {
		console.error('Fetch failed', error);
		return {
			error: error.message,
			res: null,
		};
	}
};
