import { Button } from 'flowbite-react';

interface ButtonProps {
	message: string;
	onClick: () => void;
}

const YellowButtonXs: React.FC<ButtonProps> = ({ message, onClick }) => {
	return (
		<Button
			onClick={onClick}
			className='text-white bg-yellow-300 border border-transparent enabled:hover:bg-yellow-300 focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-300'
			size='xs'
		>
			{message}
		</Button>
	);
};

export default YellowButtonXs;
