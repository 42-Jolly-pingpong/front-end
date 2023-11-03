import { Button } from 'flowbite-react';

const handleLogin = async () => {
	location.href = `${process.env.DOMAIN}/auth/intra`;
};

const LoginButton = () => {
	return (
		<Button color='gray' size='lg' onClick={handleLogin}>
			<img src='svg/42.svg' alt='42 icon' className='mr-2' />
			<span className='hover:text-primary-700'>계정으로 로그인</span>
		</Button>
	);
};

export default LoginButton;
