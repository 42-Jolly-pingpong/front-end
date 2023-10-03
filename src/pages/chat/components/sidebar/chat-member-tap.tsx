import ChatMemberInquireTap from 'pages/chat/components/sidebar/chat-member-inquire-tap';
import ChatMemberInviteTap from 'pages/chat/components/sidebar/chat-member-invite-tap';
import { useState } from 'react';
import { ChatRoom } from 'ts/interfaces/chat-room.model';

const ChatMemberTap = (props: { chat: ChatRoom }) => {
	const [isInquireTap, setIsInquireTap] = useState<boolean>(true);

	if (isInquireTap) {
		return (
			<ChatMemberInquireTap
				chat={props.chat}
				setIsInquireTap={setIsInquireTap}
			/>
		);
	}
	return (
		<ChatMemberInviteTap chat={props.chat} setIsInquireTap={setIsInquireTap} />
	);
};

export default ChatMemberTap;
