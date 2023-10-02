import Welcome from 'components/root/welcome/welcome';
import Main from 'pages/main/main';
import User from 'types/interfaces/user.model';
import DecodedToken from 'types/interfaces/decoded-jwt.model';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from 'ts/states/user-state';
import { getJwt } from 'api/auth-api';
import { getUser } from 'api/user-api';

const Root = () => {
	const [user, setUserState] = useRecoilState(userState);

	useEffect(() => {
		const fetchDecodedToken = async () => {
			const token: DecodedToken | undefined = await getJwt();
			if (token) {
				const user: User = await getUser(token.id);
				setUserState(user);
			}
		};
		fetchDecodedToken();
	}, []);

	return user ? <Main /> : <Welcome />;
};

export default Root;
