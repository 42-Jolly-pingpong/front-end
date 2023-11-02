import { Button } from 'flowbite-react';
import { ReactNode } from 'react';

interface ButtonProps {
	size: string;
	children: ReactNode;
	onClick: () => void;
}

const WhiteButton: React.FC<ButtonProps> = ({ size, children, onClick }) => {
	return (
		<Button
			className=' text-yellow-300 bg-white enabled:hover:bg-white focus:ring-0  dark:focus:ring-yellow-300 border-yellow-300 border-2'
			size={size}
			onClick={onClick}
		>
			{children}
		</Button>
	);
};

export default WhiteButton;
