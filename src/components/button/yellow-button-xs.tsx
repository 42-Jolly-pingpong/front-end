import { Button } from 'flowbite-react';
import { ReactNode } from 'react';

interface ButtonProps {
	onClick: () => void;
	children: ReactNode;
}

const YellowButtonXs: React.FC<ButtonProps> = ({ onClick, children }) => {
	return (
		<Button
			className='text-white bg-yellow-300 border border-transparent enabled:hover:bg-yellow-300 focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-300'
			size='xs'
			onClick={onClick}
		>
			{children}
		</Button>
	);
};

export default YellowButtonXs;
