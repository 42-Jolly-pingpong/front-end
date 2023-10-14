import { getJwtValue } from 'components/utils/cookieUtils';
import { useHistory } from 'react-router-dom';
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
			console.log('response가 성공');
		}
	} catch (e) {
		return undefined;
	}
};
