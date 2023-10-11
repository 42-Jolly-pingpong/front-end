import { ListGroup, Modal } from 'flowbite-react';
import { useSetRecoilState } from 'recoil';
import { ChatModalStatus } from 'ts/enums/chat-modal-status.enum';
import { chatModalState } from 'ts/states/chat-modal-state';

const AddChannelModal = () => {
	const setModalStatus = useSetRecoilState(chatModalState);

	const onClickCreate = () => {
		setModalStatus(ChatModalStatus.CREATE);
	};

	const onClickSearch = () => {
		setModalStatus(ChatModalStatus.SEARCH);
	};

	return (
		<>
			<Modal.Header>채널 추가</Modal.Header>
			<Modal.Body>
				<ListGroup>
					<ListGroup.Item onClick={onClickCreate}>채널 생성</ListGroup.Item>
					<ListGroup.Item onClick={onClickSearch}>채널 탐색</ListGroup.Item>
				</ListGroup>
			</Modal.Body>
		</>
	);
};
export default AddChannelModal;
