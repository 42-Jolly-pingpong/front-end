import { getDecodedToken } from 'components/utils/cookieUtils';
import Welcome from 'components/welcome/welcome';
import Main from 'pages/main/main';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from 'ts/states/user-state';

const Root = () => {
	const [user, setUserState] = useRecoilState(userState);

	useEffect(() => {
		const fetchDecodedToken = async () => {
			const token: string | null = await getDecodedToken();
			setUserState(token);
		};

		fetchDecodedToken();
	}, []);

	return user ? <Main /> : <Welcome />;
};

export default Root;
