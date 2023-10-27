import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Outlet } from 'react-router';
import Banner from 'components/banner/banner';
import Header from 'components/layout/header/header';
import FriendSidebar from 'components/friend/sidebar/friend-sidebar';
import { userState } from 'ts/states/user-state';
import { friendSidebarState } from 'ts/states/friend/friend-sidebar-state';
import { getUserByJwt } from 'api/auth-api';
import { getFriendList } from 'api/friend-api';
import { friendSidebarListState } from 'ts/states/friend/friend-sidebar-list-state';
import { FriendListStatus } from 'ts/enums/friend/friendlist-status.enum';
import { UserFriendsState } from 'ts/states/user/user-friends-state';

const Layout = () => {
	const setUserState = useSetRecoilState(userState);
	const sidebarState = useRecoilValue(friendSidebarState);
	const [, setUserFriendsState] = useRecoilValue(UserFriendsState);
	const [, setFriendListState] = useRecoilState(friendSidebarListState);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const updateUser = async () => {
			try {
				const user = await getUserByJwt();
				if (user !== null) {
					setUserState(user);

					let friendStatus = FriendListStatus.DEFAULT;
					const friends = await getFriendList(user.id);

					if (friends.length === 0) {
						friendStatus = FriendListStatus.EMPTY;
					}
					setFriendListState({ status: friendStatus, friends: friends });
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
