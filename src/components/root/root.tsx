import Welcome from 'components/root/welcome/welcome';
import Main from 'pages/main/main';
//import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from 'ts/states/user-state';
//import { getUserByJwt } from 'api/user-api';

const Root = () => {
	const user = useRecoilValue(userState);

	return user ? <Main /> : <Welcome />;
};

export default Root;

//[삭제예정]
//const [user, setUserState] = useRecoilState(userState);

//useEffect(() => {
//	const updateUser = async () => {
//		await getUserByJwt(setUserState);
//	};
//	updateUser();
//}, []);

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
