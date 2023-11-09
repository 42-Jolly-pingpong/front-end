import { getJsonValueByKey } from 'components/utils/cookieUtils';
import User from 'ts/interfaces/user.model';
import sendAPI from 'api/sendAPI';

export const getUserByJwt = async (): Promise<User | null> => {
	const user = await sendAPI({
		method: 'POST',
		url: '/auth/user',
	});
	return user ? user : null;
};

export const userSignUp = async (nickname: string): Promise<void> => {
	const cookies = getJsonValueByKey('user-data');

	const signUpData = {
		intraId: cookies.intraId,
		email: cookies.email,
		nickname,
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
