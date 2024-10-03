import { getUser } from '../api';
import { sessions } from '../sessions';

export const authorise = async (authLogin, authPassword) => {
	const user = await getUser(authLogin);

	if (!user) {
		return {
			error: 'There is not such a user',
			res: null,
		};
	}

	const { id, login, password, roleId } = user;

	if (authPassword !== password) {
		return {
			error: 'Wrong password!',
			res: null,
		};
	}

	return {
		error: null,
		res: {
			id,
			login,
			roleId,
			session: sessions.create(user),
		},
	};
};
