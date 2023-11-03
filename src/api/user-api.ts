import sendAPI from 'api/sendAPI';
import User from 'ts/interfaces/user.model';

export const getUserByNickname = async (
	nickname: string | undefined
): Promise<User | undefined> => {
	try {
		if (nickname) {
			const users: User[] = await sendAPI({
				method: 'GET',
				url: '/user/search/' + nickname,
			});
			if (users.length > 0) {
				return users[0];
			}
		}
	} catch (e) {
		console.log(e);
		return undefined;
	}
};
