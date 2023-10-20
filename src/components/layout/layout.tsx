import { Outlet } from 'react-router';
import { useSetRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import Banner from 'components/banner/banner';
import Header from 'components/layout/header/header';
import { userState } from 'ts/states/user-state';
import { getUserByJwt } from 'api/auth-api';

const Layout = () => {
	const setUserState = useSetRecoilState(userState);
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
				<Banner />
				<Header />
				<Outlet />
			</div>
		);
	}
};

export default Layout;
