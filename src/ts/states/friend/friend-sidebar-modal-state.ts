import { atom } from 'recoil';
import { FriendSidebarModalStatus } from 'ts/enums/friend/friend-sidebar-modal-status.enum';
import User from 'ts/interfaces/user.model';

export type FriendSidebarModalType = {
	type: FriendSidebarModalStatus;
	friend: User | null;
};

export const friendSidebarModalState = atom<FriendSidebarModalType>({
	key: 'friendSidebarModalState',
	default: { type: FriendSidebarModalStatus.CLOSE, friend: null },
});
