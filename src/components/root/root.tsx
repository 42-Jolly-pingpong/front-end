import Welcome from 'components/root/welcome/welcome';
import Main from 'pages/main/main';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from 'ts/states/user-state';
import { getUserByJwt } from 'api/user-api';

const Root = () => {
	const [user, setUserState] = useRecoilState(userState);

	useEffect(() => {
		const updateUser = async () => {
			await getUserByJwt(setUserState);
		};
		updateUser();
	}, []);

	return user ? <Main /> : <Welcome />;
};

export default Root;

//	const test = async () => {
//		const user = await getUserByJwt();

//		if (user !== undefined) {
//			setUserState(user);
//		}
//	};
//	test();
//}, []);

//useEffect(() => {
//	console.log('userUpdate!');
//	console.log(user);
//}, [user]);
