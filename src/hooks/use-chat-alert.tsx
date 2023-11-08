import { useSetRecoilState } from 'recoil';
import { chatAlertModalState } from 'ts/states/chat-alert-modal';

const useChatAlert = () => {
	const setChatAlertModal = useSetRecoilState(chatAlertModalState);

	const useAlertModal = () => {
		setChatAlertModal({
			status: true,
			title: `진행 불가`,
			subText: '알 수 없는 오류가 발생했습니다.',
			confirmButtonText: null,
			exitButtonText: '확인',
			onClickButton: () => {},
		});
	};
	return useAlertModal;
};

export default useChatAlert;
