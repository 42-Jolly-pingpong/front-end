import { Button } from 'flowbite-react';

const Login = () => {
	//const [user, setUser] = useRecoilState(userState);
	//const handleLogin = () => {};
	//return (
	//);
	return (
		<Button color='gray' pill size='xl' className='border-2'>
			<img src='../../public/svg/42.svg' alt='42 icron' />
			<div className='ml-2 mb-1 font-bold'>계정으로 로그인 </div>
		</Button>
	);
};

export default Login;
