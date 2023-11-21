import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { socket } from 'socket/socket';
import { userState } from 'ts/states/user-state';
import { userFriendsState } from 'ts/states/user/user-friends-state';
import { friendSidebarState } from 'ts/states/friend/friend-sidebar-state';
import FriendListEmpty from 'components/layout/friend-sidebar/item/friend-list-empty';
import FriendSidebarNormal from 'components/layout/friend-sidebar/friend-sidebar-normal';
import FriendSidebarHeader from 'components/layout/friend-sidebar/field/friend-sidebar-header';
import {
	getBlockedList,
	getFriendList,
	getFriendRequestList,
} from 'api/friend-api';

const FriendSidebar = () => {
	const showFriendsSidebar = useRecoilValue(friendSidebarState);
	const [userFrieds, setUserFriendsState] = useRecoilState(userFriendsState);
	const user = useRecoilValue(userState);

	const updateFriendList = async () => {
		if (user) {
			const friends = await getFriendList(user.id);
			const requestFriends = await getFriendRequestList(user.id);
			const blockedFriends = await getBlockedList(user.id);
			setUserFriendsState({ friends, requestFriends, blockedFriends });
		}
	};

	useEffect(() => {
		socket.on('reload', updateFriendList);

		return () => {
			socket.off('reload');
		};
	}, []);

	return (
		<aside
			id='friend-sidebar'
			className={`fixed top-0 right-0 z-40 w-96 h-screen transition-transform sm:translate-x-0 ${
				showFriendsSidebar ? 'visible' : 'invisible'
			}`}
			aria-label='Sidebar'
		>
			<div className='flex flex-col h-full overflow-y-auto bg-white dark:bg-gray-800 shadow-2xl'>
				<FriendSidebarHeader />
				{0 < userFrieds.friends.length + userFrieds.requestFriends.length ? (
					<FriendSidebarNormal />
				) : (
					<FriendListEmpty />
				)}
			</div>
		</aside>
	);
};

export default FriendSidebar;
