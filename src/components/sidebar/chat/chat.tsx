import { useRecoilValue } from 'recoil';
import { chatStatusSelector } from 'ts/states/chat-state';
import { ChatStatus } from 'ts/enums/chat-status.enum';
import ChatroomList from 'components/sidebar/chat/chatroom-list';
import InChat from 'components/sidebar/inchat/inchat';

const Chat = (): JSX.Element => {
	const status: ChatStatus = useRecoilValue(chatStatusSelector);

	return (
		<div className='flex flex-col h-full'>
			{status === ChatStatus.CHATLIST ? <ChatroomList /> : <InChat />}
		</div>
	);
};

export default Chat;
