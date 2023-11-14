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
			className='bg-red-700 focus:ring-0 hover:enabled:bg-red-800'
			size={size}
			onClick={onClick}
		>
			{children}
		</Button>
	);
};

export default RedButton;
