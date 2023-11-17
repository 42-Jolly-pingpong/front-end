import sendAPI from 'api/sendAPI';
import User from 'ts/interfaces/user.model';
import UpdateUserDto from 'ts/interfaces/user/update-user.model';

export const getUserByNickname = async (
	nickname: string | undefined
): Promise<User | undefined> => {
	try {
		if (nickname) {
			const users: User[] = await sendAPI({
				method: 'GET',
				url: '/user/search/' + nickname,
			});
			if (users.length > 0 && nickname === users[0].nickname) {
				return users[0];
			} else {
				return undefined;
			}
		}
	} catch (e) {
		console.log(e);
		return undefined;
	}
};

export const updateUser = async (
	updateUserDto: UpdateUserDto
): Promise<void> => {
	try {
		await sendAPI({
			method: 'PATCH',
			url: '/user',
			body: updateUserDto,
		});
	} catch (e) {
		console.log(e);
	}
};
