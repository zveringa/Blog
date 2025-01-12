import PropTypes from 'prop-types';
import styled from 'styled-components';

const ButttonContainer = ({ children, className, width, ...props }) => {
	return (
		<button className={className} {...props}>
			{children}
		</button>
	);
};

export const Button = styled(ButttonContainer)`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 18px;
	width: ${({ width = '100%' }) => width};
	height: 32px;
	border: 1px solid #000;
	background-color: #ddd;

	&:hover {
		cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
	}
`;

Button.propTypes = {
	children: PropTypes.node.isRequired,
	width: PropTypes.string,
};
