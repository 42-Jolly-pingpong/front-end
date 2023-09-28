import { Modal } from 'flowbite-react';
import AddChannelModal from 'pages/chat/components/modal/add-channel-modal';
import CreateChannelModal from 'pages/chat/components/modal/create-channel-modal';
import SearchChannelModal from 'pages/chat/components/modal/search-channel-modal';
import { useRecoilState } from 'recoil';
import { ChatModalStatus } from 'ts/enums/chat-modal-status.enum';
import { chatModalState } from 'ts/states/chat-modal-state';

const ChannelModal = () => {
	const [modalStatus, setModalStatus] = useRecoilState(chatModalState);

	const onCloseModal = () => {
		setModalStatus(ChatModalStatus.CLOSE);
	};

	const modalContent = () => {
		switch (modalStatus) {
			case ChatModalStatus.OPEN:
				return <AddChannelModal />;
			case ChatModalStatus.CREATE:
				return <CreateChannelModal />;
			case ChatModalStatus.SEARCH:
				return <SearchChannelModal />;
		}
	};

	return (
		<Modal show={modalStatus !== ChatModalStatus.CLOSE} onClose={onCloseModal}>
			{modalContent()}
		</Modal>
	);
};
export default ChannelModal;
