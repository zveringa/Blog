import { request } from '../utils/request';
import { setPostData } from './set-post-data';

export const savePostAsync = (id, newPostData) => async (dispatch) => {
	try {
		if (typeof id !== 'string' && id !== undefined) {
			throw new Error('Invalid post ID: "string" or "undefined"');
		}

		const url = id ? `/posts/${id}` : '/posts';
		const method = id ? 'PATCH' : 'POST';

		const updatedPost = await request(url, method, newPostData);

		if (!updatedPost || !updatedPost.data) {
			throw new Error('Invalid response from server');
		}

		dispatch(setPostData(updatedPost.data));
		return updatedPost.data;
	} catch (error) {
		console.error('Error saving post:', error.message);
		throw error; // Rethrow to handle it in the calling component if needed
	}
};
