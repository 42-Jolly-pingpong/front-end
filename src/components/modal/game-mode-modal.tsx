import { Button, Label, Radio, Modal } from 'flowbite-react';
import { useRecoilState } from 'recoil';
import { GameMode } from 'ts/enums/game/game-mode.enum';
import { GameWaitStatus } from 'ts/enums/game/game-wait.enum';
import { gameWaitState } from 'ts/states/game/game-wait-state';

interface ModalProps {
	show: boolean;
	onClose: () => void;
}

const GameModeModal: React.FC<ModalProps> = ({ show, onClose }) => {
	const [gameWait, setGameWait] = useRecoilState(gameWaitState);

	const handleGameStart = () => {
		setGameWait({ ...gameWait, status: GameWaitStatus.SEARCH });
	};

	const handleChange = (mode: GameMode) => {
		setGameWait({ ...gameWait, mode: mode });
	};

	return (
		<Modal size='lg' show={show} onClose={onClose} dismissible>
			<Modal.Body className='flex flex-col my-2 m-6 '>
				<div className='font-bold text-xl text-gray-900'>게임 옵션 선택</div>
				<fieldset className='flex max-w-md flex-col gap-4' id='radio'>
					<div className='flex items-center gap-2 mt-7'>
						<Radio
							defaultChecked
							id='classic'
							name='mode'
							value={GameMode.CLASSIC}
							onChange={() => handleChange(GameMode.CLASSIC)}
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
							value={GameMode.SPEED}
							onChange={() => handleChange(GameMode.SPEED)}
							className=' enabled:hover:bg-yellow-300  focus:ring-yellow-300 text-yellow-300'
						/>
						<Label htmlFor='speed'>
							<div className='text-gray-900 text-sm font-bold'>스피드</div>
							<div className='text-gray-500 text-xs'>
								공의 속도가 더 빠릅니다
							</div>
						</Label>
					</div>
				</fieldset>
				<Button
					onClick={handleGameStart}
					className='p-1 font-bold text-white bg-yellow-300 enabled:hover:bg-yellow-300 focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-300'
				>
					게임 시작
				</Button>
			</Modal.Body>
		</Modal>
	);
};

export default GameModeModal;
