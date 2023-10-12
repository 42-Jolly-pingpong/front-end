import { atom, selector } from 'recoil';
import User from 'ts/interfaces/user.model';
//import { recoilPersist } from 'recoil-persist';

//const { persistAtom } = recoilPersist();
export const userState = atom<User | null>({
	key: 'userState',
	default: null,
});

export const userSelector = selector({
	key: 'userSelector',
	get: ({ get }) => {
		const user = get(userState);
		return user;
	},
	set: ({ set }, value) => {
		set(userState, value);
	},
});
