import { H2, Icon } from '../../../../components';

import styled from 'styled-components';

const PostContentContainer = ({
	className,
	post: { id, title, imageUrl, content, publishedAt },
}) => {
	return (
		<div className={className}>
			<img src={imageUrl} alt={title} />
			<H2>{title}</H2>
			<div className="special-panel">
				<div className="published-at">
					<Icon
						id="fa-calendar-o"
						size="22px"
						margin="0 8px 0 0"
						onClick={() => {}}
					/>
					{publishedAt}
				</div>

				<div className="buttons">
					<Icon
						id="fa-pencil-square-o"
						size="26px"
						margin="0 10px 0 0"
						onClick={() => {}}
					/>
					<Icon id="fa-trash-o" onClick={() => {}} />
				</div>
			</div>
			<div className="post-text">{content}</div>
		</div>
	);
};

export const PostContent = styled(PostContentContainer)`
	& img {
		float: left;
		margin: 0px 20px 10px 0px;
	}

	& .special-panel {
		display: flex;
		justify-content: space-between;
		margin: -20px 0 20px;
	}

	& .published-at {
		display: flex;
		font-size: 22px;
	}

	& i {
		position: relative;
		top: -1px;
	}

	& .buttons {
		display: flex;
	}

	& .post-text {
		font-size: 18px;
	}
`;
