import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { friendSidebarState } from 'ts/states/friend/friend-sidebar-state';

const HeaderMenu = () => {
	const navigate = useNavigate();
	const [friendSidebar, setFriendSidebarState] =
		useRecoilState(friendSidebarState);

	const handleChat = () => {
		navigate('/chat');
	};

	const handleFriendSidebar = async () => {
		setFriendSidebarState(!friendSidebar);
	};

	return (
		<div className='flex items-center'>
			<button
				className='font-medium text-yellow-300 border-gray-200 border-l-2 pl-4'
				onClick={handleChat}
			>
				Chats
			</button>
			<button
				className='font-medium text-yellow-300 pl-4'
				onClick={handleFriendSidebar}
			>
				friends
			</button>
		</div>
	);
};

export default HeaderMenu;
