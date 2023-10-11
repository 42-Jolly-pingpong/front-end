import { getJsonValueByKey } from 'components/utils/cookieUtils';
import { Button, Card, Label, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
	const cookies = getJsonValueByKey('user-data');
	const [nickname, setNickname] = useState('');

	const handleNickname = (e) => {
		setNickname(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = {
			intraId: cookies.intraId,
			email: cookies.email,
			nickname,
		};

		try {
			const response = await fetch(`http://localhost:3000/auth/signup`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});
			console.log('singup에 있는거!');

			console.log(document.cookie);

			if (response.ok) {
				console.log('회원가입 프론트에서 받는중..');
				location.href = '/';
			} else {
				console.log('회원가입 실패 냠냠');
			}
		} catch (e) {
			console.log('하여튼 에러');
		}
	};

	return (
		<div className='flex flex-col justify-center items-center h-4/5'>
			<Card className='flex w-1/4'>
				<form className='flex flex-col gap-3' onSubmit={handleSubmit}>
					<div className='text-xl'>Sign up to Jolly Ping Pong</div>
					<Label htmlFor='email' value='Your email' className='my-2' />
					<TextInput
						id='email'
						type='email'
						placeholder={cookies.email}
						readOnly
					/>
					<Label htmlFor='nickname' value='nickname' className='my-2' />
					<TextInput
						id='nickname'
						type='text'
						required
						onChange={handleNickname}
					/>
					<Button
						type='submit'
						className='bg-yellow-300 border border-transparent enabled:hover:bg-yellow-300 mt-7'
					>
						Submit
					</Button>
				</form>
			</Card>
		</div>
	);
};

export default SignUp;
