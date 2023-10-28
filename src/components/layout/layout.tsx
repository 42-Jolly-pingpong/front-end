import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Outlet } from 'react-router';
import Banner from 'components/banner/banner';
import Header from 'components/layout/header/header';
import FriendSidebar from 'components/layout/friend-sidebar/friend-sidebar';
import { userState } from 'ts/states/user-state';
import { friendSidebarState } from 'ts/states/friend/friend-sidebar-state';
import { getUserByJwt } from 'api/auth-api';
import {
	getBlockedList,
	getFriendList,
	getFriendRequestList,
} from 'api/friend-api';
import { userFriendsState } from 'ts/states/user/user-friends-state';

const Layout = () => {
	const setUserState = useSetRecoilState(userState);
	const sidebarState = useRecoilValue(friendSidebarState);
	const [, setUserFriendsState] = useRecoilState(userFriendsState);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const updateUser = async () => {
			try {
				const user = await getUserByJwt();
				if (user !== null) {
					setUserState(user);
					const friends = await getFriendList(user.id);
					const requestFriends = await getFriendRequestList(user.id);
					const blockedFriends = await getBlockedList(user.id);
					setUserFriendsState({ friends, requestFriends, blockedFriends });
				}
			} catch (e) {
				console.log(e);
			} finally {
				setLoading(false);
			}
		};
		updateUser();
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
