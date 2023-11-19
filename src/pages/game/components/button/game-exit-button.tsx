import { BiExit } from 'react-icons/bi';

interface ButtonProps {
	onClick: () => void;
}

const GameExitButton: React.FC<ButtonProps> = ({ onClick }) => {
	return (
		<button
			className='px-5 py-2.5 bg-yellow-400 hover:bg-yellow-500 rounded-lg justify-center items-center gap-2 flex'
			onClick={onClick}
		>
			<div className="text-white text-sm font-medium font-['Inter'] leading-[21px]">
				나가기
			</div>
			<BiExit size='23px' color='white' />
		</button>
	);
};
export default GameExitButton;
