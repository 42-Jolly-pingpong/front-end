import { useNavigate } from 'react-router-dom';

const ChatMenu = () => {
	const context = useNavigate();

	const aa = () => {
		context('/create-chat');
	};

	return (
		<div className='flex justify-end'>
			<button className='btn btn-outline' onClick={aa}>
				+
			</button>
		</div>
	);
};

export default ChatMenu;
