import { Navbar } from 'flowbite-react';
import { useRecoilState } from 'recoil';
import { friendSidebarState } from 'ts/states/friend/friend-sidebar-state';

const HeaderNavigateBar = () => {
	const [friendSidebar, setFriendSidebarState] =
		useRecoilState(friendSidebarState);

	const handleFriendSidebar = () => {
		setFriendSidebarState(!friendSidebar);
	};

	return (
		<Navbar fluid className='flex items-center p-0 border-gray-400 border-l-2'>
			<Navbar.Collapse>
				<Navbar.Link href='/chat' className='font-bold text-yellow-300'>
					Chats
				</Navbar.Link>
				<Navbar.Link
					className='font-bold text-yellow-300'
					onClick={handleFriendSidebar}
				>
					Friends
				</Navbar.Link>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default HeaderNavigateBar;
