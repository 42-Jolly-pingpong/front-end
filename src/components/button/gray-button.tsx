import { ReactNode } from 'react';
import { Button } from 'flowbite-react';

interface ButtonProps {
	size: string;
	children: ReactNode;
	onClick: () => void;
}

const GrayButton: React.FC<ButtonProps> = ({ size, children, onClick }) => {
	return (
		<Button
			className='text-gray-800 bg-gray-200 focus:ring-0 hover:enabled:bg-gray-100'
			size={size}
			onClick={onClick}
		>
			{children}
		</Button>
	);
};

export default GrayButton;
