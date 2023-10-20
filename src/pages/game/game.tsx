import GameCanvas from './components/gameCanvas';

const Game = () => {
	return (
		<div className='flex flex-col items-center bg-black  justify-center h-screen'>
			<GameCanvas></GameCanvas>
		</div>
	);
};

export default Game;
