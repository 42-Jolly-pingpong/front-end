import Welcome from 'components/root/welcome/welcome';
import Main from 'pages/main/main';
import User from 'ts/interfaces/user.model';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from 'ts/states/user-state';
import { getUserByJwt } from 'api/auth-api';

const Root = () => {
	const [user, setUserState] = useRecoilState(userState);

	useEffect(() => {
		const test = async () => {
			const user: User | undefined = await getUserByJwt();
			if (user !== undefined) {
				console.log(user);
				setUserState(user);
			}
		};
		test();
	}, []);

	return user ? <Main /> : <Welcome />;
};

export default Root;
