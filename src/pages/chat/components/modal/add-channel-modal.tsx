import { ListGroup, Modal } from 'flowbite-react';

const AddChannelModal = () => {
	return (
		<>
			<Modal.Header>채널 추가</Modal.Header>
			<Modal.Body>
				<ListGroup>
					<ListGroup.Item>채널 생성</ListGroup.Item>
					<ListGroup.Item>채널 탐색</ListGroup.Item>
				</ListGroup>
			</Modal.Body>
		</>
	);
};
export default AddChannelModal;
