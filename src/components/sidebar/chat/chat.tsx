import { useRecoilValue } from 'recoil';
import { chatStatusSelector } from '../../../ts/states/chat-state';
import { ChatStatus } from '../../../ts/enums/chat-status.enum';
import InChat from '../inchat/inchat';
import ChatroomList from './chatroom-list';

const Chat = (): JSX.Element => {
	const status: ChatStatus = useRecoilValue(chatStatusSelector);

	return (
		<div className='flex flex-col h-full'>
			{status === ChatStatus.CHATLIST ? <ChatroomList /> : <InChat />}
		</div>
	);
};

export default Chat;
