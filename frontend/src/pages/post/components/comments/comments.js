import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '../../../../components';
import { Comment } from './components';
import { selectUserRole } from '../../../../selectors';
import { addCommentAsync, removeCommentAsync } from '../../../../actions';
import { PROP_TYPE, ROLE } from '../../../../constants';
import styled from 'styled-components';

const CommentsContainer = ({ className, comments: initialComments, postId }) => {
	const [comments, setComments] = useState(initialComments); // Use state to manage comments
	const [newComment, setNewComment] = useState(''); // Manage new comment input
	const userRole = useSelector(selectUserRole);
	const dispatch = useDispatch();

	const onNewCommentAdd = (postId, content) => {
		dispatch(addCommentAsync(postId, content))
			.then((newComment) => {
				// Add the new comment to the local state
				setComments((prevComments) => [...prevComments, newComment]);
				setNewComment(''); // Clear the input field
			})
			.catch((error) => {
				console.error('Error adding comment:', error.message);
				alert('Failed to add comment. Please try again.');
			});
	};

	const onCommentRemove = (commentId) => {
		dispatch(removeCommentAsync(postId, commentId))
			.then(() => {
				setComments((prevComments) =>
					prevComments.filter((comment) => comment.id !== commentId),
				);
			})

			.catch((error) => {
				console.error('Error deleting comment:', error.message);
				alert('Failed to delete comment. Please try again.');
			});
	};
	const isGuest = userRole === ROLE.GUEST;

	return (
		<div className={className}>
			{!isGuest && (
				<div className="new-comment">
					<textarea
						name="comment"
						value={newComment}
						placeholder="Comment..."
						onChange={({ target }) => setNewComment(target.value)}
					></textarea>
					<Icon
						id="fa-paper-plane-o"
						size="22px"
						margin="0 0 0 10px"
						onClick={() => onNewCommentAdd(postId, newComment)}
					/>
				</div>
			)}
			<div className="comments">
				{comments.map(({ id, author, content, publishedAt }) => (
					<Comment
						key={id}
						postId={postId}
						id={id}
						author={author}
						content={content}
						publishedAt={publishedAt}
						onRemove={() => onCommentRemove(id)} // Pass removal handler
					/>
				))}
			</div>
		</div>
	);
};

export const Comments = styled(CommentsContainer)`
	width: 580px;
	margin: 0 auto;

	& .new-comment {
		display: flex;
		width: 100%;
		margin: 20px 0 0;
	}

	& .new-comment textarea {
		width: 550px;
		height: 120px;
		font-size: 18px;
		resize: none;
	}
`;

Comments.propTypes = {
	comments: PropTypes.arrayOf(PROP_TYPE.COMMENT).isRequired,
	postId: PropTypes.string.isRequired,
};
