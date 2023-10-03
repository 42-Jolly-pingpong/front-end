import { Modal } from 'flowbite-react';
import { CreateChannelModal } from 'pages/chat/components/modal/create-channel-modal';
import { useRecoilState } from 'recoil';
import { ChatModalStatus } from 'ts/enums/chat-modal-status.enum';
import { chatModalState } from 'ts/states/chat-modal-state';
import SearchChannelModal from 'pages/chat/components/modal/search-channel-modal';

const ChannelModal = () => {
	const [modalStatus, setModalStatus] = useRecoilState(chatModalState);

	const onCloseModal = () => {
		setModalStatus(ChatModalStatus.CLOSE);
	};

	const modalContent = () => {
		switch (modalStatus) {
			case ChatModalStatus.CREATE:
				return <CreateChannelModal />;
			case ChatModalStatus.SEARCH:
				return <SearchChannelModal />;
		}
	};

	return (
		<Modal
			show={modalStatus !== ChatModalStatus.CLOSE}
			onClose={onCloseModal}
			className='max-h-screen'
		>
			{modalContent()}
		</Modal>
	);
};
export default ChannelModal;
