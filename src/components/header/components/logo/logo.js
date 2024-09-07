import { Link } from 'react-router-dom';

import { Icon } from '../../../../components';

import styled from 'styled-components';

const LargeText = styled.div`
	font-size: 40px;
	font-weight: 600;
	line-height: 38px;
`;

const SmallText = styled.div`
	font-size: 18px;
	font-weight: bold;
	margin-top: 18px;
`;

const LogoContainer = ({ className }) => (
	<Link className={className} to="/">
		<Icon id="fa-code" size="70px" margin="0 30px 0 0" />
		<div>
			<SmallText>WEB developer's</SmallText>
			<LargeText>Blog</LargeText>
		</div>
	</Link>
);

export const Logo = styled(LogoContainer)`
	display: flex;
	margin-top: -20px;
`;
