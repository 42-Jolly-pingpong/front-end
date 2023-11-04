import { HiX } from 'react-icons/hi';

interface ButtonProps {
	size: string;
	onClick: () => void;
}

const CancelButton: React.FC<ButtonProps> = ({ size, onClick }) => {
	return (
		<HiX
			onClick={onClick}
			className={`h-${size} w-${size} cursor-pointer text-gray-500`}
		/>
	);
};

export default CancelButton;
