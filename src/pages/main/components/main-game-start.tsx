import GameStartButton from 'components/button/game-start-button';
import GameModeCheckbox from 'pages/main/components/game-mode-checkbox';

const MainGameStart = () => {
	return (
		<div className='flex flex-col items-center justify-center text-center mt-72'>
			<div className='text-6xl mb-12 font-bold'>Play Game With Somebody!</div>
			<GameStartButton />
		</div>
	);
};

export default MainGameStart;
