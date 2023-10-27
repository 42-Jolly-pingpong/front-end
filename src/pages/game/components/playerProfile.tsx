import { useRecoilValue } from "recoil";
import { gameInfoState } from "ts/states/game/game-info.state";
import { opponentInfoState } from "ts/states/game/opponent-info-state";
import { userState } from "ts/states/user-state";

export function PlayerProfile() {
	const gameInfo = useRecoilValue(gameInfoState)
	const myInfo = useRecoilValue(userState)
	const opponentInfo = useRecoilValue(opponentInfoState)

	return (
		<div className='w-[1152px] flex h-14 justify-center items-center gap-2'>
			<div className='h-12 justify-end items-center gap-2 flex'>
				<div className="text-gray-200 text-lg font-medium font-['Inter'] leading-[27px]">
					{gameInfo.position == 1 ? myInfo?.intraId : opponentInfo?.intraId}
				</div>
				<img
					className='w-12 h-12 relative rounded-[100px]'
					src={gameInfo.position == 1 ? myInfo?.avatarPath : opponentInfo?.avatarPath}
				/>
			</div>
			<div className="text-gray-200 text-lg font-bold font-['Inter'] leading-normal">
				vs
			</div>
			<div className='h-12 justify-start items-center gap-2 flex'>
				<img
					className='w-12 h-12 relative rounded-[100px]'
					src={gameInfo.position == 2 ? myInfo?.avatarPath : opponentInfo?.avatarPath}
				/>
				<div className="text-gray-200 text-lg font-medium font-['Inter'] leading-[27px]">
					{gameInfo.position == 2 ? myInfo?.intraId : opponentInfo?.intraId}
				</div>
			</div>
		</div>
	);
}