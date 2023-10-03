import { Dropdown, Sidebar } from 'flowbite-react';
import { BiPlus } from 'react-icons/bi';
import { useSetRecoilState } from 'recoil';
import { ChatModalStatus } from 'ts/enums/chat-modal-status.enum';
import { chatModalState } from 'ts/states/chat-modal-state';

const CreateChannel = () => {
	const setModalStatus = useSetRecoilState(chatModalState);

	const onClickCreate = () => {
		setModalStatus(ChatModalStatus.CREATE);
	};

	const onClickSearch = () => {
		setModalStatus(ChatModalStatus.SEARCH);
	};

	const addChannalButton = () => {
		return (
			<Sidebar.Item>
				<div className='flex items-center'>
					<BiPlus className='mr-2' size='20' />
					<div className='text-base font-medium'>채널 추가</div>
				</div>
			</Sidebar.Item>
		);
	};

	return (
		<Dropdown
			label='채널 추가하기'
			dismissOnClick={false}
			renderTrigger={() => addChannalButton()}
		>
			<Dropdown.Item onClick={onClickCreate}>새 채널 생성</Dropdown.Item>
			<Dropdown.Item onClick={onClickSearch}>채널 탐색</Dropdown.Item>
		</Dropdown>
	);
};

export default CreateChannel;
