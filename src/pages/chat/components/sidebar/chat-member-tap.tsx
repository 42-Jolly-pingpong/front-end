import ChatMemberInquireTap from 'pages/chat/components/sidebar/chat-member-inquire-tap';
import ChatMemberInviteTap from 'pages/chat/components/sidebar/chat-member-invite-tap';
import { useState } from 'react';
import { ChatParticipant } from 'ts/interfaces/chat-participant.model';
import { ChatRoom } from 'ts/interfaces/chat-room.model';

const ChatMemberTap = (props: { chat: ChatRoom }) => {
	const [isInquireTap, setIsInquireTap] = useState<boolean>(true);
	const [participants, setParticipants] = useState<ChatParticipant[]>(
		props.chat.participants
	);

	if (isInquireTap) {
		return (
			<ChatMemberInquireTap
				chat={props.chat}
				participants={participants}
				setIsInquireTap={setIsInquireTap}
			/>
		);
	}
	return (
		<ChatMemberInviteTap
			chat={props.chat}
			participants={participants}
			setParticipants={setParticipants}
			setIsInquireTap={setIsInquireTap}
		/>
	);
};

export default ChatMemberTap;
