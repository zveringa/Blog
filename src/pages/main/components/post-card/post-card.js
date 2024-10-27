import styled from 'styled-components';
import { Icon } from '../../../../components';
import { Link } from 'react-router-dom';

const PostCardContainer = ({
	className,
	id,
	title,
	imageUrl,
	publishedAt,
	commentsCount,
}) => {
	return (
		<div className={className}>
			<Link to={`/post/${id}`}>
				<img src={imageUrl} alt={title} />
				<div className="post-card-footer">
					<h4>{title}</h4>
					<div className="post-card-info">
						<div className="published-at">
							<Icon
								inactive={true}
								id="fa-calendar-o"
								size="22px"
								margin="0 8px 0 0 "
							/>
							{publishedAt}
						</div>
						<div className="comments-count">
							<Icon
								inactive={true}
								id="fa-comment-o"
								size="22px"
								margin="0 8px 0 0 "
							/>
							{commentsCount}
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
};

export const PostCard = styled(PostCardContainer)`
	display: flex;
	flex-direction: column;
	width: 280px;
	margin: 20px;
	border: 1px solid #000;

	& img {
		display: block;
	}

	& .post-card-footer {
		padding: 5px;
		border-top: 1px solid #000;
	}

	& h4 {
		margin: 0;
	}

	& .post-card-info {
		display: flex;
		justify-content: space-between;
		padding: 5px;
	}

	& .published-at {
		display: flex;
	}

	& .comments-count {
		display: flex;
	}
`;
