import PropTypes from 'prop-types';
import { Input, Icon } from '../../../../components';
import styled from 'styled-components';

const SearchContainer = ({ className, searchPhrase, onChange }) => {
	return (
		<div className={className}>
			<Input
				value={searchPhrase}
				placeholder="Search by title..."
				onChange={onChange}
			/>
			<Icon inactive={true} id="fa-search" size="22px" />
		</div>
	);
};

export const Search = styled(SearchContainer)`
	display: flex;
	position: relative;
	width: 340px;
	height: 40px;
	margin: 40px auto 0;

	& > input {
		padding: 10px 35px 10px 10px;
	}

	& > div {
		position: absolute;
		top: 3px;
		right: 9px;
	}
`;

Search.propTypes = {
	searchPhrase: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};
