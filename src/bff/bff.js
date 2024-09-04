import { getUser } from './get-users';
import { addUser } from './add-user';
import { createSession } from '../create-session';

export const server = {
	async authorize(authLogin, authPassword) {
		const user = await getUser(authLogin);

		if (!user) {
			return {
				error: 'There is not such a user',
				res: null,
			};
		}

		if (authPassword !== user.password) {
			return {
				error: 'Wrong password!',
				res: null,
			};
		}

		return {
			error: null,
			res: createSession(user.role_id),
		};
	},

	async register(regLogin, regPassword) {
		const user = await getUser(regLogin);

		if (user) {
			return {
				error: 'This login already in use',
				res: null,
			};
		}

		await addUser(regLogin, regPassword);

		return {
			error: null,
			res: createSession(user.role_id),
		};
	},
};
