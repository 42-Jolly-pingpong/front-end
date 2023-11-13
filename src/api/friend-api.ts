import sendAPI from 'api/sendAPI';
import User from 'ts/interfaces/user.model';
import { ProfileStatus } from 'ts/enums/profile/profile-status.enum';

/**
 * url : friends/
 */

export const getFriendList = async (id: number): Promise<User[]> => {
	try {
		const friendList = await sendAPI({
			method: 'GET',
			url: '/friends/' + id,
		});
		return friendList;
	} catch (e) {
		console.log(e);
		return [];
	}
};

export const updateFriend = async (id: number): Promise<void> => {
	try {
		await sendAPI({
			method: 'POST',
			url: '/friends/' + id,
		});
	} catch (e) {
		console.log(e);
	}
};

export const deleteFriend = async (id: number): Promise<void> => {
	try {
		await sendAPI({
			method: 'DELETE',
			url: '/friends/' + id,
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
		const requestList = await sendAPI({
			method: 'GET',
			url: '/friends/request/' + id,
		});
		return requestList;
	} catch (e) {
		console.log(e);
		return [];
	}
};

export const acceptFriendRequest = async (id: number): Promise<void> => {
	try {
		await sendAPI({
			method: 'POST',
			url: '/friends/request/' + id,
		});
	} catch (e) {
		console.log(e);
	}
};

export const denyFriendRequest = async (id: number): Promise<void> => {
	try {
		await sendAPI({
			method: 'DELETE',
			url: '/friends/request/' + id,
		});
	} catch (e) {
		console.log(e);
	}
};

/**
 * url: friends/blocked/
 */

export const getBlockedList = async (id: number): Promise<User[]> => {
	try {
		const blockedList = await sendAPI({
			method: 'GET',
			url: '/friends/blocked/' + id,
		});
		return blockedList;
	} catch (e) {
		console.log(e);
		return [];
	}
};

export const addBlockedFriend = async (id: number): Promise<void> => {
	try {
		await sendAPI({
			method: 'POST',
			url: '/friends/blocked/' + id,
		});
	} catch (e) {
		console.log(e);
	}
};

export const deleteBlockedFriend = async (id: number): Promise<void> => {
	try {
		await sendAPI({
			method: 'DELETE',
			url: '/friends/blocked/' + id,
		});
	} catch (e) {
		console.log(e);
	}
};

/**
 * url: friends/{id}/ + ...
 */

export const getFriendRelation = async (id: number): Promise<ProfileStatus> => {
	try {
		const status = await sendAPI({
			method: 'GET',
			url: '/friends/' + id + '/state',
		});
		return status;
	} catch (e) {
		console.log(e);
		return ProfileStatus.UNKNOWN;
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

export const getFriendState = async (id: number): Promise<ProfileStatus> => {
	try {
		const state: ProfileStatus = await sendAPI({
			method: 'GET',
			url: '/friends/' + id + '/state',
		});
		return state;
	} catch (e) {
		console.log(e);
		return ProfileStatus.UNDEFINED;
	}
};
