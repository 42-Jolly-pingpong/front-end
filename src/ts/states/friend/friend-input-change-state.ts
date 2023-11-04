import { atom } from 'recoil';
import User from 'ts/interfaces/user.model';

export type FriendInputListType = {
	state: boolean;
	friends: User[] | null;
};

export const friendInputChangeState = atom<FriendInputListType>({
	key: 'friendInputChangeState',
	default: { state: false, friends: null },
});
