import { Avatar } from 'flowbite-react';
import { useRecoilValue } from 'recoil';
import { userState } from 'ts/states/user-state';
import { gameInfoState } from 'ts/states/game/game-info.state';
import { opponentInfoState } from 'ts/states/game/opponent-info-state';

export function PlayerProfile() {
	const gameInfo = useRecoilValue(gameInfoState);
	const myInfo = useRecoilValue(userState);
	const opponentInfo = useRecoilValue(opponentInfoState);

	return (
		<div className='w-[1152px] flex h-14 justify-center items-center gap-2'>
			<div className='h-12 justify-end items-center gap-2 flex'>
				<div className='text-gray-200 text-lg font-medium'>
					{gameInfo.position == 1 ? myInfo?.nickname : opponentInfo?.nickname}
				</div>
				<Avatar
					size='md'
					rounded
					img={
						gameInfo.position == 1
							? myInfo?.avatarPath || ''
							: opponentInfo?.avatarPath || ''
					}
				/>
			</div>
			<div className='text-gray-200 text-lg font-bold leading-normal'>vs</div>
			<div className='h-12 justify-start items-center gap-2 flex'>
				<Avatar
					size='md'
					rounded
					img={
						gameInfo.position == 2
							? myInfo?.avatarPath || ''
							: opponentInfo?.avatarPath || ''
					}
				/>
				<div className='text-gray-200 text-lg font-medium'>
					{gameInfo.position == 2 ? myInfo?.nickname : opponentInfo?.nickname}
				</div>
			</div>
		</div>
	);
}
