import { atom, selector } from 'recoil';
import { FriendListStatus } from 'ts/enums/friend/friendlist-status.enum';
import User from 'ts/interfaces/user.model';

export type FriendSidebarListType = {
	status: FriendListStatus;
	friends: User[] | null;
};

export const friendSidebarListState = atom<FriendSidebarListType>({
	key: 'friendSidebarListState',
	default: { status: FriendListStatus.DEFAULT, friends: null },
});

export const friendSidebarListSelector = selector({
	key: 'friendSidebarListSelector',
	get: ({ get }) => {
		const state = get(friendSidebarListState);

		return state;
	},
	set: ({ set }, value) => {
		set(friendSidebarListState, value);
	},
});
