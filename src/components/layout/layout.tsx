import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Outlet } from 'react-router';
import Banner from 'components/banner/banner';
import Header from 'components/layout/header/header';
import FriendSidebar from 'components/layout/sidebar/friend-sidebar';
import { userState } from 'ts/states/user-state';
import { friendSidebarState } from 'ts/states/friend/friend-sidebar-state';
import { getUserByJwt } from 'api/auth-api';

const Layout = () => {
	const setUserState = useSetRecoilState(userState);
	const sidebarState = useRecoilValue(friendSidebarState);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const updateUser = async () => {
			try {
				const user = await getUserByJwt();
				if (user) {
					setUserState(user);
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
				<Header />
				<Banner />
				<Outlet />
				{sidebarState && <FriendSidebar />}
			</div>
		);
	}
};

export default Layout;
