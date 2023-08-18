import GameStartButton from '../button/game-start-button';
import GameModeCheckbox from './game-mode-checkbox';

const MainGameStart = () => {
	return (
		<div className='flex flex-col bg-white items-center justify-center text-center border-double border-4 w-1/5 h-1/5 mt mt-60'>
			<GameModeCheckbox />
			<GameStartButton />
		</div>
	);
};

export default MainGameStart;
