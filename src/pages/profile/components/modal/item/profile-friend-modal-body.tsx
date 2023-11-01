import { Button, Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

interface ModalBodyProp {
	message: string;
	buttonMessage: string;
	onCancel: () => void;
	onRequest: () => void;
}

const ProfileFriendModalBody: React.FC<ModalBodyProp> = ({
	message,
	buttonMessage,
	onCancel,
	onRequest,
}) => {
	return (
		<Modal.Body>
			<div className='text-center'>
				<HiOutlineExclamationCircle className='mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200' />
				<h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
					{message}
				</h3>
				<div className='flex justify-center gap-4'>
					<Button color='failure' onClick={onRequest}>
						{buttonMessage}
					</Button>
					<Button color='gray' onClick={onCancel}>
						그만두기
					</Button>
				</div>
			</div>
		</Modal.Body>
	);
};

export default ProfileFriendModalBody;
