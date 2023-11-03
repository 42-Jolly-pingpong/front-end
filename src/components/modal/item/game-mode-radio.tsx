import { COUNTDOWN_MATCH_INTERVAL } from 'constants/values';
import { Label, Radio } from 'flowbite-react';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { GameMode } from 'ts/enums/game/game-mode.enum';
import { gameWaitState } from 'ts/states/game/game-wait-state';

const GameModeRadio = () => {
	const [gameWait, setGameWait] = useRecoilState(gameWaitState);

	useEffect(() => {
		setGameWait({ ...gameWait, mode: GameMode.NORMAL });
	}, []);

	const handleChange = (mode: GameMode) => {
		setGameWait({ ...gameWait, mode: mode });
	};

	return (
		<fieldset className='flex max-w-md flex-col gap-4' id='radio'>
			<div className='flex items-center gap-2 mt-7'>
				<Radio
					defaultChecked
					id='classic'
					name='mode'
					onChange={() => handleChange(GameMode.NORMAL)}
					className='enabled:hover:bg-yellow-300  focus:ring-yellow-300 text-yellow-300'
				/>
				<Label htmlFor='classic'>
					<div className='text-gray-900 text-sm font-bold'>클래식</div>
					<div className='text-gray-500 text-xs'>
						Pong 게임 방식으로 진행됩니다
					</div>
				</Label>
			</div>
			<div className='flex items-center gap-2 mt-4 mb-7'>
				<Radio
					id='speed'
					name='mode'
					onChange={() => handleChange(GameMode.SPEED)}
					className=' enabled:hover:bg-yellow-300  focus:ring-yellow-300 text-yellow-300'
				/>
				<Label htmlFor='speed'>
					<div className='text-gray-900 text-sm font-bold'>스피드</div>
					<div className='text-gray-500 text-xs'>공의 속도가 더 빠릅니다</div>
				</Label>
			</div>
		</fieldset>
	);
};

export default GameModeRadio;
