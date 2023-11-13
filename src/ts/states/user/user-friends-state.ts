import { atom } from 'recoil';
import User from 'ts/interfaces/user.model';

export type UserFriendsType = {
	friends: User[];
	requestFriends: User[];
	blockedFriends: User[];
};

export const userFriendsState = atom<UserFriendsType>({
	key: 'userFriendsState',
	default: { friends: [], requestFriends: [], blockedFriends: [] },
});
