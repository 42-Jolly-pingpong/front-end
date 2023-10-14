import { Outlet } from 'react-router';
import Header from 'components/layout/header/header';
import { useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import { getUserByJwt } from 'api/auth-api';
import { userState } from 'ts/states/user-state';

const Layout = () => {
	const setUserState = useSetRecoilState(userState);

	useEffect(() => {
		const updateUser = async () => {
			await getUserByJwt(setUserState);
		};
		updateUser();
	}, []);

	return (
		<div className='flex flex-col h-screen'>
			<Header />
			<Outlet />
		</div>
	);
};

export default Layout;
