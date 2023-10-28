import { ReactNode } from 'react';
import { Button } from 'flowbite-react';

interface ButtonProps {
	size: string;
	children: ReactNode;
	onClick: () => void;
}

const RedButton: React.FC<ButtonProps> = ({ size, children, onClick }) => {
	return (
		<Button
			className='text-white bg-red-700 enabled:hover:bg-red-700 focus:ring-0  border-gray-200 border-2'
			size={size}
			onClick={onClick}
		>
			{children}
		</Button>
	);
};

export default RedButton;
