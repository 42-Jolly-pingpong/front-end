import { getJsonValueByKey } from 'components/utils/cookieUtils';
import User from 'ts/interfaces/user.model';
import sendAPI from 'api/sendAPI';
import CreateUserDto from 'ts/interfaces/user/create-user.model';

export const getUserByJwt = async (): Promise<User | null> => {
	const user = await sendAPI({
		method: 'POST',
		url: '/auth/user',
	});

	return user ? user : null;
};

export const userSignUp = async (
	createUserDto: CreateUserDto
): Promise<void> => {
	const cookies = getJsonValueByKey('user-data');

	const signUpData = {
		intraId: cookies.intraId,
		email: cookies.email,
		avatarPath: createUserDto.avatarPath,
		nickname: createUserDto.nickname,
	};

	try {
		await sendAPI({
			method: 'POST',
			url: '/auth/signup',
			body: signUpData,
		});
	} catch (e) {
		console.log(e);
	}
};

export const userSignOut = async (): Promise<void> => {
	try {
		await sendAPI({
			method: 'GET',
			url: '/auth/signout',
		});
	} catch (e) {
		console.log(e);
	}
};
