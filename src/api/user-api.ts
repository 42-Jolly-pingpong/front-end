import User from 'ts/interfaces/user.model';

export const getUserByNickname = async (nickname: string): Promise<User> => {
	try {
		const response = await fetch(
			'http://localhost:3000/user/search/' + nickname
		);

		if (response.ok) {
			const data: User[] = await response.json();
			const user: User | undefined = data[0];
			return user;
		}
	} catch (e) {
		console.log(e);
	}
};
