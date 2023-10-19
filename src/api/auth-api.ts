import { getJsonValueByKey, getJwtValue } from 'components/utils/cookieUtils';
import User from 'ts/interfaces/user.model';

export const getUserByJwt = async (
	setUserState: any
): Promise<User | undefined> => {
	try {
		const token = getJwtValue();

		const response = await fetch('http://localhost:3000/auth/user', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		});

		if (response.ok) {
			const user = await response.json();
			setUserState(user);
		}
	} catch (e) {
		return undefined;
	}
};

export const userSignUp = async (nickname: string): Promise<void> => {
	try {
		const cookies = getJsonValueByKey('user-data');

		const formData = {
			intraId: cookies.intraId,
			email: cookies.email,
			nickname,
		};

		const response = await fetch('http://localhost:3000/auth/signup', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		});

		if (response) {
			console.log('회원가입 성공');
			window.location.href = '/';
		} else {
			console.log('회원가입 실패');
		}
	} catch (e) {
		console.log(e);
	}
};

export const userSignOut = async (setUserState: any): Promise<void> => {
	try {
		console.log('sign out 보내기 전');
		const response = await fetch('http://localhost:3000/auth/signout', {
			method: 'GET',
			credentials: 'include',
			headers: {
				origin: 'http://localhost:5173',
			},
		});

		if (response) {
			setUserState(null);
			window.location.href = '/';
		}
	} catch (e) {
		return undefined;
	}
};
