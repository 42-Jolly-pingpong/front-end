import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { useRecoilValue, useSetRecoilState } from 'recoil';
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

const Layout = () => {
	const setUserState = useSetRecoilState(userState);
	const sidebarState = useRecoilValue(friendSidebarState);
	const setUserFriendsState = useSetRecoilState(userFriendsState);
	const [loading, setLoading] = useState(true);

	const updateUser = async () => {
		const user = await getUserByJwt();
		setUserState(user);
		if (user) {
			const friends = await getFriendList(user.id);
			const requestFriends = await getFriendRequestList(user.id);
			const blockedFriends = await getBlockedList(user.id);
			setUserFriendsState({ friends, requestFriends, blockedFriends });
		}
		setLoading(false);
	};

	useEffect(() => {
		const fetchData = async () => {
			await updateUser();
		};
		fetchData();
	}, []);

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
