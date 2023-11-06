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
		<div className='flex items-center gap-4'>
			<a
				className='capitalize text-sm font-medium text-yellow-300 cursor-pointer'
				onClick={handleChat}
			>
				chats
			</a>
			<a
				className='capitalize text-sm font-medium text-yellow-300 cursor-pointer'
				onClick={handleFriendSidebar}
			>
				friends
			</a>
		</div>
	);
};

export default HeaderMenu;
