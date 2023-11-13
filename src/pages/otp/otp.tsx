import sendAPI from 'api/sendAPI';
import { Button, Card, Label, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Otp = () => {
	const naviate = useNavigate();
	const [code, setCode] = useState<string>('');
	const [errorMessage, setErrorMessage] = useState<string>('');

	const handleSubmit = async () => {
		const data = await sendAPI({
			method: 'POST',
			url: `/auth/otp`,
			body: { code },
		});
		const { isValid } = data;

		if (isValid) naviate('/', { replace: true });
		else setErrorMessage('코드가 일치하지 않습니다.');
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setErrorMessage('');
		const value = e.target.value.trim();
		setCode(value);
	};

	return (
		<div className='flex justify-center items-center h-screen'>
			<Card className='w-96'>
				<div className='flex flex-col gap-y-6'>
					<div className='text-xl font-bold'>OTP 인증하기</div>
					<div className='flex flex-col gap-y-2'>
						<Label htmlFor='code' value='코드' />
						<TextInput
							id='code'
							type='text'
							color={errorMessage ? 'failure' : undefined}
							helperText={errorMessage}
							onChange={handleChange}
							required
						/>
					</div>
					<Button
						type='button'
						className='bg-yellow-300 border border-transparent enabled:hover:bg-yellow-300 mt-7'
						disabled={code.length < 1}
						onClick={handleSubmit}
					>
						인증하기
					</Button>
				</div>
			</Card>
		</div>
	);
};

export default Otp;
