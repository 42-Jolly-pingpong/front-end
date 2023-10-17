interface ButtonProps {
	message: string;
}

const BannerMessage: React.FC<ButtonProps> = ({ message }) => {
	return <div className='pl-2 text-gray-500'>{message}</div>;
};

export default BannerMessage;
