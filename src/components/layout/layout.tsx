import { Outlet } from 'react-router';
import Header from 'components/layout/header/header';
import { useSetRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { getUserByJwt } from 'api/auth-api';
import { userState } from 'ts/states/user-state';
import GameRequestAlert from 'components/alert/game-request-alert';

const Layout = () => {
	const setUserState = useSetRecoilState(userState);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const updateUser = async () => {
			await getUserByJwt(setUserState);
			setLoading(false);
		};
		updateUser();
	}, []);

	if (loading === false) {
		return (
			<div className='flex flex-col h-screen'>
				<GameRequestAlert />
				<Header />
				<Outlet />
			</div>
		);
	}
};

export default Layout;
