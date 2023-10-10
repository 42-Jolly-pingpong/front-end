import User from 'ts/interfaces/user.model';
import axios from './axios';

export const getUserByJwt = async (): Promise<User | undefined> => {
	try {
		return await axios.post('/auth/user');
	} catch (e) {
		return undefined;
	}
};
