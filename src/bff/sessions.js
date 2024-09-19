export const sessions = {
	list: {},
	create(user) {
		const hash = Math.random().toFixed(50);

		this.list[hash] = user;

		return;
	},

	remove(hash) {
		delete this.list[hash];
	},
};
