import { getJsonValueByKey, getJwtValue } from 'components/utils/cookieUtils';
import User from 'ts/interfaces/user.model';
import sendAPI from 'api/sendAPI';

export const getUserByJwt = async (): Promise<User | undefined> => {
	try {
		const token = getJwtValue();

		if (token) {
			const user = await sendAPI({
				method: 'POST',
				url: '/auth/user',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return user;
		}
		return undefined;
	} catch (e) {
		console.log(e);
		return undefined;
	}
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

		window.location.href = '/';
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
		window.location.href = '/';
	} catch (e) {
		console.log(e);
	}
};
