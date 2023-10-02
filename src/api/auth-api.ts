import DecodedToken from 'types/interfaces/decoded-jwt.model';
import axios from './axios';

export const getJwt = async (): Promise<DecodedToken | undefined> => {
	try {
		const response = await axios.post('/auth/decoded-token');

		if (response.status === 200) {
			return response.data;
		} else {
			console.log('받아오기 실패');
		}
	} catch (e) {
		console.log(e);
	}
};
