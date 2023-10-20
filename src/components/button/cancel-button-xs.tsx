import { HiX } from 'react-icons/hi';

interface ButtonProps {
	onClick: () => void;
}

const CancelButtonXs: React.FC<ButtonProps> = ({ onClick }) => {
	return <HiX onClick={onClick} className='h-4 w-4 cursor-pointer ml-4' />;
};

export default CancelButtonXs;
