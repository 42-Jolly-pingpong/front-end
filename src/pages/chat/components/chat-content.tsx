import ChatHeader from "pages/chat/components/chat-header";

const ChatContent = () => {
	return (
		<div className='flex flex-col justify-between max-h-screen'>
			<ChatHeader />
			<div className='overflow-y-auto'></div>
			<div>footer</div>
			{/* <ChatInput /> */}
		</div>
	);
};

export default ChatContent;
