import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Error } from '../error/error';
import { selectUserRole } from '../../selectors';
import { accessCheck } from '../../utils/access-check';
import { ERROR, PROP_TYPE } from '../../constants';

export const PrivateContent = ({ access, children, serverError = null }) => {
	const userRole = useSelector(selectUserRole);

	const accessError = accessCheck(access, userRole) ? null : ERROR.ACCESS_DENIED;
	const error = serverError || accessError;
	return error ? <Error error={error} /> : children;
};

PrivateContent.propTypes = {
	children: PropTypes.node.isRequired,
	access: PropTypes.arrayOf(PROP_TYPE.ROLE_ID).isRequired,
	serverError: PROP_TYPE.ERROR,
};
