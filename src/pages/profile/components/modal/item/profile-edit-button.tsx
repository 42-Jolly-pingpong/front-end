import { Button } from 'flowbite-react';

interface submitProps {
	onChange: () => void;
	disabled: boolean;
}

const ProfileEditButton: React.FC<submitProps> = ({ onChange, disabled }) => {
	return (
		<Button
			type='submit'
			className='text-white bg-yellow-300 border border-transparent enabled:hover:bg-yellow-300 focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-300'
			size='2xl'
			disabled={disabled}
			onClick={onChange}
		>
			<div className='p-2'>수정하기</div>
		</Button>
	);
};

export default ProfileEditButton;
