import { atom } from 'recoil';

export const friendSidebarReloadState = atom<boolean>({
	key: 'friendSidebarReloadState',
	default: true,
});
