import { getJwtValue } from 'components/utils/cookieUtils';
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
			console.log(user);
			setUserState(user);
		}
	} catch (e) {
		return undefined;
	}
};
