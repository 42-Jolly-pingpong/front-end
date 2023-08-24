export {};

declare global {
	interface Window {
		modal: any;
		winRateModal: any;
		gameWaitModal: any;
		gameResultModal: any;
		twoFactorAuthCheckModal: any;
		twoFactorAuthModal: any;
		emailAuthModal: any;
		withdrawModal: any;
		avatarChangeModal: any;
		checkPasswordModal: HTMLFormElement;
	}
}
