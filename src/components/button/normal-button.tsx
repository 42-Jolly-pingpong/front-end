import { ReactNode } from 'react';
import { Button } from 'flowbite-react';

interface ButtonProps {
	size: string;
	children: ReactNode;
	onClick: () => void;
}

const NormalButton: React.FC<ButtonProps> = ({ size, children, onClick }) => {
	return (
		<Button
			className='text-black bg-white enabled:hover:bg-white focus:ring-0  border-gray-200 border-2'
			size={size}
			onClick={onClick}
		>
			{children}
		</Button>
	);
};

export default NormalButton;
