import { Button } from 'flowbite-react';
import { ReactNode } from 'react';

interface ButtonProps {
	onClick: () => void;
	children: ReactNode;
}

const WhiteButtonXl: React.FC<ButtonProps> = ({ onClick, children }) => {
	return (
		<Button
			className='mt-6 font-bold text-yellow-300 bg-white enabled:hover:bg-white focus:ring-0  dark:focus:ring-yellow-300 border-yellow-300 border-2 w-32'
			size='xl'
			onClick={onClick}
		>
			{children}
		</Button>
	);
};

export default WhiteButtonXl;
