import sendAPI from 'api/sendAPI';
import User from 'ts/interfaces/user.model';

export const getUserByNickname = async (
	nickname: string
): Promise<User | undefined> => {
	try {
		if (nickname) {
			const users = await sendAPI({
				method: 'GET',
				url: '/user/search/' + nickname,
			});
			return users[0];
		}
	} catch (e) {
		console.log(e);
		return undefined;
	}
};
