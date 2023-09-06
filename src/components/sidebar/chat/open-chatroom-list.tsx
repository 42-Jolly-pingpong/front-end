import ChatElement from 'components/sidebar/chat/chatroom-element';
import { tempChatroom1, tempChatroom2 } from '../temp-chat-user'; // 임시

const OpenChatroomList = () => {
	return (
		<div className='collapse collapse-arrow'>
			<input type='checkbox' />
			<div className='collapse-title text-xl'>open chat</div>
			<div className='collapse-content overflow-y-auto'>
				<ChatElement {...tempChatroom1} />
				<ChatElement {...tempChatroom1} />
				<ChatElement {...tempChatroom2} />
			</div>
		</div>
	);
};

export default OpenChatroomList;
