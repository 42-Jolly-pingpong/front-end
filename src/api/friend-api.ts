import sendAPI from 'api/sendAPI';
import { getJwtValue } from 'components/utils/cookieUtils';
import User from 'ts/interfaces/user.model';

export const getFriendList = async (id: number): Promise<User[]> => {
	try {
		const token = getJwtValue();

		const friendList = await sendAPI({
			method: 'GET',
			url: '/friends/' + id,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(friendList);
		return friendList;
	} catch (e) {
		console.log(e);
		return [];
	}
};

export const deleteFriend = async (id: number): Promise<void> => {
	try {
		const token = getJwtValue();

		await sendAPI({
			method: 'DELETE',
			url: '/friends/' + id,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	} catch (e) {
		console.log(e);
	}
};

export const addBlockedFriend = async (id: number): Promise<void> => {
	try {
		const token = getJwtValue();

		await sendAPI({
			method: 'POST',
			url: '/friends/blocked/' + id,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	} catch (e) {
		console.log(e);
	}
};

export const getFriendListBySearch = async (
	id: number,
	keyword: string
): Promise<User[]> => {
	try {
		const friendList = await sendAPI({
			method: 'GET',
			url: '/friends/' + id + '/search/' + keyword,
		});
		return friendList;
	} catch (e) {
		console.log(e);
		return [];
	}
};
