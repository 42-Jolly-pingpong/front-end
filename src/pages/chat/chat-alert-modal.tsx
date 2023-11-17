import { Button, Modal } from 'flowbite-react';
import { useRecoilState } from 'recoil';
import { chatAlertModalState } from 'ts/states/chat-alert-modal';

const ChatAlertModel = () => {
	const [modalState, setModalState] = useRecoilState(chatAlertModalState);
	const {
		status,
		title,
		subText,
		confirmButtonText,
		exitButtonText,
		onClickButton,
	} = modalState;

	const onCloseModal = () => {
		setModalState((pre) => ({ ...pre, status: false }));
	};

	return (
		<Modal show={status} onClose={onCloseModal}>
			<Modal.Header className='break-all'>{title}</Modal.Header>
			<Modal.Body className='flex flex-col justify-between'>
				<div>{subText}</div>
				<div className='flex justify-end mt-10'>
					<Button
						className='mr-3 text-gray-800 text-xs font-medium bg-white border-gray-200 enabled:hover:bg-gray-300'
						onClick={onCloseModal}
					>
						{exitButtonText}
					</Button>
					{confirmButtonText === null ? null : (
						<Button
							className='text-white text-xs font-medium bg-primary-700 enabled:hover:bg-primary-800'
							onClick={onClickButton}
						>
							{confirmButtonText}
						</Button>
					)}
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default ChatAlertModel;
