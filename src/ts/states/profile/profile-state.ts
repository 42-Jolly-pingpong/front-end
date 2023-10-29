import { atom, selector } from 'recoil';
import { ProfileStatus } from 'ts/enums/profile/profile-status.enum';
import User from 'ts/interfaces/user.model';

export type ProfileType = {
	type: ProfileStatus;
	user: User | null;
};

export const profileState = atom<ProfileType>({
	key: 'profileState',
	default: { type: ProfileStatus.UNDEFINED, user: null },
});

export const profileSelector = selector({
	key: 'profileSelector',
	get: ({ get }) => {
		const user = get(profileState);
		return user;
	},
	set: ({ set }, value) => {
		set(profileState, value);
	},
});
