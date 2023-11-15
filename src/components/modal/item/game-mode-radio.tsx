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

	const modes = [
		{
			id: 'classic',
			text: '클래식',
			description: 'Pong 게임 방식으로 진행됩니다',
			handleChange: () => handleChange(GameMode.NORMAL),
		},
		{
			id: 'speed',
			text: '스피드',
			description: '공의 속도가 더 빠릅니다',
			handleChange: () => handleChange(GameMode.SPEED),
		},
	];

	return (
		<fieldset className='flex max-w-md flex-col gap-4' id='radio'>
			{modes.map((mode, index) => (
				<div key={index} className='flex items-start gap-3'>
					<Radio
						defaultChecked={index == 0}
						id={mode.id}
						name='mode'
						onChange={() => mode.handleChange()}
						className='enabled:hover:bg-yellow-300 focus:ring-yellow-300 text-yellow-300 mt-1'
					/>
					<Label htmlFor={mode.id} className='flex flex-col gap-1'>
						<div className='text-gray-900 text-sm'>{mode.text}</div>
						<div className='text-gray-500 text-xs'>{mode.description}</div>
					</Label>
				</div>
			))}
		</fieldset>
	);
};

export default GameModeRadio;
