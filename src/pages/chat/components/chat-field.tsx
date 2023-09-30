import { useRecoilValue } from 'recoil';
import { chatState } from 'ts/states/chat-state';

const ChatField = () => {
	const chat = useRecoilValue(chatState);
	if (chat === null) {
		return <></>;
	}
	const type = chat?.roomType;

	return <div className='overflow-y-auto'></div>;
};

export default ChatField;
