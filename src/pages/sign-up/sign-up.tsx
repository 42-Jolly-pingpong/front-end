import { getJsonValueByKey } from 'components/utils/cookieUtils';
import { Button, Card, Label, TextInput } from 'flowbite-react';

const SignUp = () => {
	const cookies = getJsonValueByKey('user-data');

	return (
		<div className='flex flex-col justify-center items-center h-4/5'>
			<Card className='flex w-1/4'>
				<form className='flex flex-col gap-3'>
					<div className='text-xl'>Sign up to Jolly Ping Pong</div>
					<Label htmlFor='email' value='Your email' className='my-2' />
					<TextInput
						id='email'
						type='email'
						placeholder={cookies.email}
						readOnly
					/>
					<Label htmlFor='nickname' value='nickname' className='my-2' />
					<TextInput id='nickname' type='text' required />
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
