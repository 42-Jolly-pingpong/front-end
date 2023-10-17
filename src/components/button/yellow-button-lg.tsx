import { Button } from 'flowbite-react';
import { ReactNode } from 'react';

interface ButtonProps {
	onClick: () => void;
	children: ReactNode;
}

const YellowButtonLg: React.FC<ButtonProps> = ({ onClick, children }) => {
	return (
		<Button
			className='font-bold text-white bg-yellow-300 enabled:hover:bg-yellow-300 focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-300'
			size='lg'
			onClick={onClick}
		>
			{children}
		</Button>
	);
};

export default YellowButtonLg;
