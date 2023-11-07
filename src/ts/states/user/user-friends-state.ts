import { atom } from 'recoil';
import User from 'ts/interfaces/user.model';

export type UserFriendsType = {
	friends: User[] | null;
	requestFriends: User[] | null;
	blockedFriends: User[] | null;
};

export const userFriendsState = atom<UserFriendsType>({
	key: 'userFriendsState',
	default: { friends: null, requestFriends: null, blockedFriends: null },
});
