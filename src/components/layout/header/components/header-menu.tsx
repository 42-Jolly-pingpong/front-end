import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { friendSidebarState } from 'ts/states/friend/friend-sidebar-state';

const HeaderMenu = () => {
	const navigate = useNavigate();
	const [friendSidebar, setFriendSidebarState] =
		useRecoilState(friendSidebarState);

	const menus = [
		{
			title: 'chat',
			clickHandler: () => {
				navigate('/chat');
			},
		},
		{
			title: 'friends',
			clickHandler: () => {
				setFriendSidebarState(!friendSidebar);
			},
		},
	];

	return (
		<div className='flex items-center gap-4'>
			{menus.map(({ title, clickHandler }) => (
				<a
					key={title}
					className='capitalize text-sm font-medium text-yellow-300 cursor-pointer'
					data-drawer-show='drawer-right-example'
					data-drawer-placement='right'
					aria-controls='drawer-right-example'
					onClick={clickHandler}
				>
					{title}
				</a>
			))}
		</div>
	);
};

export default HeaderMenu;
