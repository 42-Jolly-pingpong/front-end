import { ReactNode } from 'react';
import { Button } from 'flowbite-react';

interface ButtonProps {
	size: string;
	children: ReactNode;
	onClick: () => void;
}

const YellowButton: React.FC<ButtonProps> = ({ size, children, onClick }) => {
	return (
		<Button
			className='text-white bg-yellow-300 enabled:hover:bg-yellow-400 focus:ring-yellow-300'
			size={size}
			onClick={onClick}
		>
			{children}
		</Button>
	);
};

export default YellowButton;
