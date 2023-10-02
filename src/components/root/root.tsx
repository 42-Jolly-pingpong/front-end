import Welcome from 'components/welcome/welcome';
import Main from 'pages/main/main';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from 'ts/states/user-state';
import DecodedToken from 'types/interfaces/decoded-jwt.model';
import User from 'types/interfaces/user.model';
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
				console.log(user);
			}
		};
		fetchDecodedToken();
	}, []);

	return user ? <Main /> : <Welcome />;
};

export default Root;
