import { useSelector } from 'react-redux';
import { Error } from '../error/error';
import { selectUserRole } from '../../selectors';
import { accessCheck } from '../../utils/access-check';
import { ERROR } from '../../constants';

export const PrivateContent = ({ access, children, serverError = null }) => {
	const userRole = useSelector(selectUserRole);

	const accessError = accessCheck(access, userRole) ? null : ERROR.ACCESS_DENIED;
	const error = serverError || accessError;
	return error ? <Error error={error} /> : children;
};
