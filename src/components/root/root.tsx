import Welcome from 'components/welcome/welcome';
import Main from 'pages/main/main';
import { useRecoilValue } from 'recoil';
import { userState } from 'ts/states/user-state';

const Root = () => {
	const user = useRecoilValue(userState);

	return user ? <Main /> : <Welcome />;
};

export default Root;
