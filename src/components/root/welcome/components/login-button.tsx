import { Button } from 'flowbite-react';

const handleLogin = () => {
	location.href = `${process.env.REACT_APP_BACKEND_URL}/auth/intra`;
};

const LoginButton = () => {
	return (
		<Button
			color='gray'
			size='lg'
			onClick={handleLogin}
			className='enabled:hover:text-yellow-300 focus:ring-1 focus:ring-yellow-200 focus:text-yellow-300'
		>
			<img src='svg/42.svg' alt='42 icon' className='mr-2' />
			계정으로 로그인
		</Button>
	);
};

export default LoginButton;
