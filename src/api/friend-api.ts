import sendAPI from 'api/sendAPI';
import { getJwtValue } from 'components/utils/cookieUtils';
import { ProfileStatus } from 'ts/enums/profile/profile-status.enum';
import User from 'ts/interfaces/user.model';

/**
 * url : friends/
 */

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

/**
 * url: friends/request/
 */
export const getFriendRequestList = async (id: number): Promise<User[]> => {
	try {
		const token = getJwtValue();

		const requestList = await sendAPI({
			method: 'GET',
			url: '/friends/request/' + id,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return requestList;
	} catch (e) {
		console.log(e);
		return [];
	}
};

export const acceptFriendRequest = async (id: number): Promise<void> => {
	try {
		const token = getJwtValue();

		await sendAPI({
			method: 'POST',
			url: '/friends/request/' + id,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	} catch (e) {
		console.log(e);
	}
};

export const denyFriendRequest = async (id: number): Promise<void> => {
	try {
		const token = getJwtValue();

		await sendAPI({
			method: 'DELETE',
			url: '/friends/request/' + id,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	} catch (e) {
		console.log(e);
	}
};

/**
 * url: friends/blocked/
 */

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

/**
 * url: friends/{id}/ + ...
 */

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

export const getFriendState = async (id: number): Promise<ProfileStatus> => {
	try {
		const token = getJwtValue();

		const state: ProfileStatus = await sendAPI({
			method: 'GET',
			url: '/friends/' + id + '/state',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return state;
	} catch (e) {
		console.log(e);
		return ProfileStatus.UNDEFINED;
	}
};
