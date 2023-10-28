import { BiExit } from 'react-icons/bi';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { AiOutlineMessage, AiOutlineUserAdd } from 'react-icons/ai';
import { gameInfoState } from 'ts/states/game/game-info.state';
import { socket } from 'socket/socket';
import { gameStartState } from 'ts/states/game/game-start-state';
import { gameResultState } from 'ts/states/game/game-result-state';
import Confetti from 'react-confetti';

export function GameResult() {
	const gameInfo = useRecoilValue(gameInfoState)
	const gameResult = useRecoilValue(gameResultState);
	const setIsGameStart = useSetRecoilState(gameStartState);
	

	const exitEvent = () => {
		socket.emit('endGame', gameInfo.roomName);
		setIsGameStart(false);
	}

	return (
		<div className='w-[1128px] h-[900px] flex-col justify-center items-center gap-20 inline-flex'>
			{gameResult === gameInfo.position ? <Confetti /> : null}
			<div className="text-center text-white text-9xl font-bold font-['Inter'] leading-[192px]">
				{gameResult === gameInfo.position ? 'VICTORY' : 'DEFEAT'}
			</div>
			<div className='flex-col justify-center items-center gap-10 flex'>
				<div className='px-2 justify-center items-center gap-2 inline-flex'>
				</div>
				<div className='self-stretch justify-center items-center gap-6 inline-flex'>
					<div className='justify-start items-start gap-2 flex'>
						<button className='px-5 py-2.5 rounded-lg border border-yellow-400 hover:bg-gray-500 justify-center items-center gap-2 flex'>
							<AiOutlineUserAdd size='23px' color='#FDCE02' />
							<div className="text-yellow-400 text-sm font-medium font-['Inter'] leading-[21px]">
								친구 신청
							</div>
						</button>
						<button className='px-5 py-2.5 rounded-lg border border-yellow-400 hover:bg-gray-500 justify-center items-center gap-2 flex'>
							<AiOutlineMessage color='#FDCE02' size='23px' />
							<div className="text-yellow-400 text-sm font-medium font-['Inter'] leading-[21px]">
								메시지
							</div>
						</button>
					</div>
					<div className='justify-center items-center gap-2 flex'>
						<button className='px-5 py-2.5 bg-yellow-400 hover:bg-yellow-500 rounded-lg justify-center items-center gap-2 flex' onClick={exitEvent}>
							<div className="text-white text-sm font-medium font-['Inter'] leading-[21px]">
								나가기
							</div>
							<BiExit size='23px' color='white' />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
