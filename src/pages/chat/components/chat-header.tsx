import ChatHeaderSearch from 'pages/chat/components/chat-header-search';
import ChatHeaderTitle from 'pages/chat/components/chat-header-title';
import { useRecoilValue } from 'recoil';
import { chatHeaderState } from 'ts/states/chat-header-state';

const ChatHeader = () => {
	const isHeaderForTitle = useRecoilValue(chatHeaderState);

	return <>{isHeaderForTitle ? <ChatHeaderTitle /> : <ChatHeaderSearch />}</>;
};

export default ChatHeader;
