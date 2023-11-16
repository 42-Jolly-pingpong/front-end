import { useState } from 'react';
import { Card } from 'flowbite-react';
import { userSignUp } from 'api/auth-api';
import SignUpTitle from 'pages/sign-up/components/sign-up-title';
import SignUpEmailInput from 'pages/sign-up/components/sign-up-email-input';
import SignUpNicknameInput from 'pages/sign-up/components/sign-up-nickname-input';
import SignUpSubmitButton from 'pages/sign-up/components/sign-up-submit-button';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
	const [nickname, setNickname] = useState('');
	const [validNickname, setValidNickname] = useState(false);
	const navigate = useNavigate();

	const handleNickname = (nickname: string) => {
		if (nickname) {
			setNickname(nickname);
			setValidNickname(true);
		} else {
			setValidNickname(false);
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await userSignUp(nickname);
		navigate('/', { replace: true });
	};

	return (
		<div className='flex justify-center items-center h-screen'>
			<Card className='w-96'>
				<form
					name='create-user'
					className='flex flex-col gap-y-6'
					onSubmit={handleSubmit}
				>
					<SignUpTitle />
					<SignUpEmailInput />
					<SignUpNicknameInput onChange={handleNickname} />
					<SignUpSubmitButton disabled={!validNickname} />
				</form>
			</Card>
		</div>
	);
};

export default SignUp;
