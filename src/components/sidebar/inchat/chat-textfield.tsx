const ChatTextfield = () => {
	return (
		<div className='flex'>
			<input className='block w-full rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset' />
			<button>전송</button>
		</div>
	);
};

export default ChatTextfield;
