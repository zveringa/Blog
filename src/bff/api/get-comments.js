import { transformComment } from '../transformers';

export const getComments = (postId) =>
	fetch(`http://localhost:3005/comments?postId=${postId}`)
		.then((loadedComments) => loadedComments.json())
		.then((loadedComments) => loadedComments.map(transformComment));
