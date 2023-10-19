import { Button } from 'flowbite-react';

const handleLogin = async () => {
	location.href = 'http://localhost:3000/auth/intra';
};

const LoginButton = () => {
	return (
		<Button color='gray' size='xl' className='border-2' onClick={handleLogin}>
			<img src='svg/42.svg' alt='42 icon' />
			<div className='ml-2 mb-1 font-bold'>계정으로 로그인 </div>
		</Button>
	);
};

export default LoginButton;
