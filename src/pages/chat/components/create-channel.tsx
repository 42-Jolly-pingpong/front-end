import { Sidebar } from 'flowbite-react';
import { BiPlus } from 'react-icons/bi';
import { useSetRecoilState } from 'recoil';
import { ChatModalStatus } from 'ts/enums/chat-modal-status.enum';
import { chatModalState } from 'ts/states/chat-modal-state';

const CreateChannel = () => {
	const setModalStatus = useSetRecoilState(chatModalState);

	const onClickCreateChannel = () => {
		setModalStatus(ChatModalStatus.OPEN);
	};

	return (
		<Sidebar.Item onClick={onClickCreateChannel}>
			<div className='flex items-center'>
				<BiPlus className='mr-1' />
				<div>채널 추가</div>
			</div>
		</Sidebar.Item>
	);
};

export default CreateChannel;
