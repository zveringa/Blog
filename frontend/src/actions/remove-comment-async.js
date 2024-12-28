import { request } from '../utils/request';
import { removeComment } from './remove-comment';

export const removeCommentAsync = (postId, id) => (dispatch) => {
	// Return the Promise so the caller can chain .then() or .catch()
	return request(`/posts/${postId}/comments/${id}`, 'DELETE')
		.then(() => {
			dispatch(removeComment(id)); // Dispatch action to update the Redux store
		})
		.catch((error) => {
			console.error('Error removing comment:', error.message);
			throw error; // Re-throw error for the caller to handle
		});
};
