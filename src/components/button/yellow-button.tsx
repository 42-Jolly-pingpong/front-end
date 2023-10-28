import { Button } from 'flowbite-react';
import { ReactNode } from 'react';

interface ButtonProps {
	size: string;
	children: ReactNode;
	onClick: () => void;
}

const YellowButton: React.FC<ButtonProps> = ({ size, children, onClick }) => {
	return (
		<Button
			className='text-white bg-yellow-300 border border-transparent enabled:hover:bg-yellow-300 focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-300'
			size={size}
			onClick={onClick}
		>
			{children}
		</Button>
	);
};

export default YellowButton;
