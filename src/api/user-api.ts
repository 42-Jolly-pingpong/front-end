import axios from './axios';

export const getUser = async (id: number) => {
	try {
		const response = await axios.get(`/user/${id}`);

		if (response.status === 200) {
			return response.data;
		} else {
			console.log('유저 정보 불러오기 실패');
		}
	} catch (e) {
		console.log('user 받아오기 에러');
	}
};
