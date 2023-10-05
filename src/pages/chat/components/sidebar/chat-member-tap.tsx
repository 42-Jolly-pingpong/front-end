import ChatMemberInquireTap from 'pages/chat/components/sidebar/chat-member-inquire-tap';
import ChatMemberInviteTap from 'pages/chat/components/sidebar/chat-member-invite-tap';
import { useState } from 'react';
import { ChatParticipant } from 'ts/interfaces/chat-participant.model';

const ChatMemberTap = () => {
	const [isInquireTap, setIsInquireTap] = useState<boolean>(true);

	if (isInquireTap) {
		return (
			<ChatMemberInquireTap
				setIsInquireTap={setIsInquireTap}
			/>
		);
	}
	return (
		<ChatMemberInviteTap
			setIsInquireTap={setIsInquireTap}
		/>
	);
};

export default ChatMemberTap;
