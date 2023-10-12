import User from 'ts/interfaces/user.model';
import axios from './axios';

export const getUserByJwt = async (
	setUserState: any
): Promise<User | undefined> => {
	try {
		const response = await axios.post('/auth/user');

		if (response.data !== undefined) {
			setUserState(response.data);
		}
	} catch (e) {
		return undefined;
	}
};

// tmp (삭제 예정)
//export const getUser = async (id: number) => {
//	try {
//		const response = await axios.get(`/user/${id}`);

//		if (response.status === 200) {
//			return response.data;
//		} else {
//			console.log('유저 정보 불러오기 실패');
//		}
//	} catch (e) {
//		console.log('user 받아오기 에러');
//	}
//};
