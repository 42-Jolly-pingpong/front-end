// 친구 요청됨 -> 친구 요청 취소
// 친구 -> 친구 끊기
// 차단 -> 차단 풀기

import GrayButton from 'components/button/gray-button';
import RedButton from 'components/button/red-button';
import { Modal } from 'flowbite-react';
import { BsExclamationCircleFill } from 'react-icons/bs';

interface ModalProps {
	show: boolean;
	userId: number;
	onClose: () => void;
}

const ProfileFriendModal: React.FC<ModalProps> = ({
	show,
	userId,
	onClose,
}) => {
	const handleClick = async () => {
		// 여기에 request-cancel API
		console.log(userId);
		console.log('요청 취소 API 붙이기');
		onClose();
	};

	const handleCancel = () => {
		onClose();
	};

	return (
		<Modal size='lg' show={show} onClose={onClose} dismissible>
			<Modal.Header />
			<Modal.Body className='flex flex-col my-2 m-6 items-center justify-center'>
				<div className='flex flex-col'>
					<BsExclamationCircleFill />
					<div className='pt-1 text-gray-500 text-base'>
						친구 요청을 취소할까요?
					</div>
					<div className='flex'>
						<RedButton size='xl' onClick={handleClick}>
							<div className='font-bold'>요청 취소</div>
						</RedButton>
						<div className='px-2' />
						<GrayButton size='xl' onClick={handleCancel}>
							그만두기
						</GrayButton>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default ProfileFriendModal;
