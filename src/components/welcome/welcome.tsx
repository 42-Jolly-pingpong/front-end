import { useRecoilState } from 'recoil';
import { userState } from 'ts/states/user-state';

const Welcome = () => {
	const [user, setUser] = useRecoilState(userState);

	const handleLogin = () => {};

	return <div> welcome page 입니당</div>;
};

export default Welcome;
