import { atom, selector } from 'recoil';
import { SidebarStatus } from '../enums/sidebar-status.enum';

export const sidebarState = atom({
	key: 'sidebarState',
	default: SidebarStatus.NONE,
});

export const sidebarSelector = selector({
	key: 'sidebarSelector',
	get: ({ get }) => {
		const state = get(sidebarState);

		return state;
	},
});
