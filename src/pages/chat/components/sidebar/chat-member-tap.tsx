import ChatMemberInquireTap from 'pages/chat/components/sidebar/inquire-tap/chat-member-inquire-tap';
import ChatMemberInviteTap from 'pages/chat/components/sidebar/invite-tap/chat-member-invite-tap';
import { useState } from 'react';

const ChatMemberTap = () => {
	const [isInquireTap, setIsInquireTap] = useState<boolean>(true);

	if (isInquireTap) {
		return <ChatMemberInquireTap setIsInquireTap={setIsInquireTap} />;
	}
	return <ChatMemberInviteTap setIsInquireTap={setIsInquireTap} />;
};

export default ChatMemberTap;
