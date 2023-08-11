import { useRecoilValue } from 'recoil';
import { chatStatusSelector } from '../../../ts/state/chat-state';
import { ChatStatus } from '../../../ts/enum/chat-status.enum';
import InChat from '../inchat/inchat';
import ChatroomList from './chatroom-list';

const Chat = (): JSX.Element => {
	const status: ChatStatus = useRecoilValue(chatStatusSelector);

	return (
		<div>
			{
				status === ChatStatus.CHATLIST ? <ChatroomList /> : <InChat />
			}
		</div>
	);
}

export default Chat