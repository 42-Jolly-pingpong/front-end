import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Outlet } from 'react-router';
import Banner from 'components/banner/banner';
import Header from 'components/layout/header/header';
import FriendSidebar from 'components/layout/friend-sidebar/friend-sidebar';
import { userState } from 'ts/states/user-state';
import { userFriendsState } from 'ts/states/user/user-friends-state';
import { friendSidebarState } from 'ts/states/friend/friend-sidebar-state';
import { getUserByJwt } from 'api/auth-api';
import {
	getBlockedList,
	getFriendList,
	getFriendRequestList,
} from 'api/friend-api';
import { friendSidebarReloadState } from 'ts/states/friend/friend-sidebar-reload-state';
import { socket } from 'socket/socket';

const Layout = () => {
	const [user, setUserState] = useRecoilState(userState);
	const sidebarState = useRecoilValue(friendSidebarState);
	const [, setUserFriendsState] = useRecoilState(userFriendsState);
	const [loading, setLoading] = useState(true);
	//const [reload, setReload] = useRecoilState(friendSidebarReloadState);

	useEffect(() => {
		const updateUser = async () => {
			const newUser = await getUserByJwt();
			if (newUser) {
				socket.emit('setClient', newUser.id);
				setUserState(newUser);
			}
		};
		updateUser();
	}, []);

	useEffect(() => {
		const updateFriendList = async () => {
			setLoading(true);
			if (user) {
				const friends = await getFriendList(user.id);
				const requestFriends = await getFriendRequestList(user.id);
				const blockedFriends = await getBlockedList(user.id);
				setUserFriendsState({ friends, requestFriends, blockedFriends });
			}
			setLoading(false);
		};

		updateFriendList();

		socket.on('reload', updateFriendList);

		return () => {
			socket.off('reload');
		};
	}, [user]);

	if (loading === false) {
		return (
			<div className='flex flex-col h-screen'>
				<Banner />
				<Header />
				<Outlet />
				{sidebarState && <FriendSidebar />}
			</div>
		);
	}
};

export default Layout;
