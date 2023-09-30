import { Sidebar } from 'flowbite-react';
import { BiPlus } from 'react-icons/bi';
import { useSetRecoilState } from 'recoil';
import { chatHeaderState } from 'ts/states/chat-header-state';
import { chatState } from 'ts/states/chat-state';

const CreateDm = () => {
	const setChatState = useSetRecoilState(chatState);
	const setChatHeaderState = useSetRecoilState(chatHeaderState);

	const onClickCreate = () => {
		setChatState(null);
		setChatHeaderState(false);
	};

	return (
		<Sidebar.Item onClick={onClickCreate}>
			<div className='flex items-center'>
				<BiPlus className='mr-1' />
				<div>대화상대 추가</div>
			</div>
		</Sidebar.Item>
	);
};

export default CreateDm;
