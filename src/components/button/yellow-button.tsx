import { ReactNode } from 'react';
import { Button } from 'flowbite-react';

interface ButtonProps {
	size?: string;
	children: ReactNode;
	onClick: () => void;
}

const YellowButton: React.FC<ButtonProps> = ({
	size = 'md',
	children,
	onClick,
}) => {
	return (
		<Button
			className='text-white bg-primary-700 focus:ring-0 hover:enabled:bg-primary-800'
			size={size}
			onClick={onClick}
		>
			{children}
		</Button>
	);
};

export default YellowButton;
