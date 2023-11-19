import { socket } from 'socket/socket';
import GameCanvas from './components/gameCanvas';
import { PlayerProfile } from './components/playerProfile';
import { useEffect, useState } from 'react';
import { GameResult } from './components/gameResult';
import { opponentInfoState } from '../../ts/states/game/opponent-info-state';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { gameInfoState } from 'ts/states/game/game-info.state';
import { gameStartState } from 'ts/states/game/game-start-state';
import { useNavigate } from 'react-router-dom';
import { gameResultState } from 'ts/states/game/game-result-state';

const Game = () => {
	const gameInfo = useRecoilValue(gameInfoState);
	const [isGameEnd, setIsGameEnd] = useState<boolean>(false);
	const setOpponentInfo = useSetRecoilState(opponentInfoState);
	const [isGameStart, setIsGameStart] = useRecoilState(gameStartState);
	const setGameResult = useSetRecoilState(gameResultState);
	const navigate = useNavigate();

	const getUser = async (id: number) => {
		const json = await (
			await fetch(
				`${
					process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000'
				}/user/${id}`
			)
		).json();
		setOpponentInfo(json);
	};

	useEffect(() => {
		socket.on('gameResult', (winner: number) => {
			setGameResult(winner);
			setIsGameEnd(true);
		});

		socket.on('exitGame', () => {
			setIsGameStart(false);
		});

		getUser(gameInfo.opponent);

		return () => {
			socket.off('gameEnd');
			setIsGameStart(false);
		};
	}, []);

	useEffect(() => {
		if (!isGameStart) navigate('/');
	}, [isGameStart]);

	return (
		<div className='flex flex-col items-center bg-black  justify-center h-screen'>
			{!isGameEnd ? (
				<div>
					<PlayerProfile />
					<GameCanvas />
				</div>
			) : (
				<GameResult />
			)}
		</div>
	);
};

export default Game;
