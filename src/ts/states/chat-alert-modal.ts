import { atom } from 'recoil';

export type chatAlertModalType = {
	status: boolean;
	title: string;
	subText: string;
	confirmButtonText: string | null;
	exitButtonText: string;
	onClickButton: () => void;
};

export const chatAlertModalState = atom<chatAlertModalType>({
	key: 'chatAlertModalState',
	default: {
		status: false,
		title: '',
		subText: '',
		confirmButtonText: null,
		exitButtonText: '',
		onClickButton: () => {},
	},
});
