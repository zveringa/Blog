import { request } from '../utils/request';
import { addComment } from './add-comment';

export const addCommentAsync = (postId, content) => (dispatch) => {
	// Return the Promise to allow chaining
	return request(`/posts/${postId}/comments`, 'POST', { content })
		.then((response) => {
			const comment = response.data; // Adjust based on your API response structure
			dispatch(addComment(comment)); // Update Redux store with new comment
			return comment; // Resolve the Promise with the new comment
		})
		.catch((error) => {
			console.error('Error adding comment:', error.message);
			throw error; // Re-throw for caller to handle
		});
};
