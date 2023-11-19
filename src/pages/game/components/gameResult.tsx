import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { socket } from 'socket/socket';
import { AiOutlineMessage } from 'react-icons/ai';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { gameInfoState } from 'ts/states/game/game-info.state';
import { gameStartState } from 'ts/states/game/game-start-state';
import { gameResultState } from 'ts/states/game/game-result-state';
import { ProfileStatus } from 'ts/enums/profile/profile-status.enum';
import { opponentInfoState } from 'ts/states/game/opponent-info-state';
import GameExitButton from 'pages/game/components/button/game-exit-button';
import GameFriendButton from 'pages/game/components/button/game-friend-button';
import ProfileFriendModal from 'pages/profile/components/modal/profile-friend-modal';
import GameCustomButton from 'components/button/\bgame-custom-button';
import {
	deleteBlockedFriend,
	deleteFriend,
	denyFriendRequest,
	getFriendRelation,
	updateFriend,
} from 'api/friend-api';

export function GameResult() {
	const gameInfo = useRecoilValue(gameInfoState);
	const gameResult = useRecoilValue(gameResultState);
	const opponent = useRecoilValue(opponentInfoState);
	const setIsGameStart = useSetRecoilState(gameStartState);
	const [relation, setRelation] = useState<ProfileStatus>(
		ProfileStatus.UNDEFINED
	);
	const [modalState, setModalState] = useState(false);

	const findRelation = async () => {
		const relationData = await getFriendRelation(opponent!.id);
		setRelation(relationData);
	};

	useEffect(() => {
		const fetchData = async () => {
			await findRelation();
		};
		fetchData();
	}, []);

	const handleClick = async () => {
		if (relation === ProfileStatus.UNDEFINED) {
			await updateFriend(opponent!.id);
			findRelation();
		} else {
			setModalState(true);
		}
	};

	const handleClose = () => {
		setModalState(false);
	};

	const handleChange = async () => {
		const opponentId = opponent!.id;

		switch (relation) {
			case ProfileStatus.FRIEND:
				await deleteFriend(opponentId);
				break;
			case ProfileStatus.REQUESTEDBYME:
				await denyFriendRequest(opponentId);
				break;
			case ProfileStatus.BLOCKEDBYME:
				await deleteBlockedFriend(opponentId);
				break;
		}
		findRelation();
		setModalState(false);
	};

	const handleMessage = () => {
		// dm방으로 navigate
	};

	const exitEvent = () => {
		socket.emit('endGame', gameInfo.roomName);
		setIsGameStart(false);
	};

	return (
		<div className='w-[1128px] h-[900px] flex-col justify-center items-center gap-20 inline-flex'>
			{gameResult === gameInfo.position ? <Confetti /> : null}
			<div className='text-center text-white text-9xl font-bold'>
				{gameResult === gameInfo.position ? 'VICTORY' : 'DEFEAT'}
			</div>
			<div className='flex-col justify-center items-center gap-10 flex'>
				<div className='px-2 justify-center items-center gap-2 inline-flex' />
				<div className='self-stretch justify-center items-center gap-6 inline-flex'>
					<div className='justify-start items-start gap-2 flex'>
						<GameFriendButton relation={relation} onClick={handleClick} />
						<ProfileFriendModal
							show={modalState}
							relation={relation}
							onRequest={handleChange}
							onClose={handleClose}
						/>
						<GameCustomButton
							icon={<AiOutlineMessage color='#FDCE02' size='23px' />}
							message='메시지'
							onClick={handleMessage}
						/>
						<GameExitButton onClick={exitEvent} />
					</div>
				</div>
			</div>
		</div>
	);
}

{
	/*<button className='px-5 py-2.5 rounded-lg border border-yellow-400 hover:bg-gray-500 justify-center items-center gap-2 flex'>
							<AiOutlineMessage color='#FDCE02' size='23px' />
							<div className="text-yellow-400 text-sm font-medium font-['Inter'] leading-[21px]">
								메시지
							</div>
						</button>*/
}
