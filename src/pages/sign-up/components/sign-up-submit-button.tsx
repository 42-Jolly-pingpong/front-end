import { Button } from 'flowbite-react';

interface submitProps {
	disabled: boolean;
}

const SignUpSubmitButton: React.FC<submitProps> = ({ disabled }) => {
	return (
		<Button
			type='submit'
			className='bg-yellow-300 border border-transparent enabled:hover:bg-yellow-300 mt-7'
			disabled={disabled}
		>
			계정 만들기
		</Button>
	);
};

export default SignUpSubmitButton;
