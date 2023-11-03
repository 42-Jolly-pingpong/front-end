import { Avatar } from 'flowbite-react';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { GameMode } from 'ts/enums/game/game-mode.enum';
import { GameHistory } from 'ts/interfaces/game-history.model';
import { profileState } from 'ts/states/profile/profile-state';

interface FriendProps {
	history: GameHistory;
}

const ProfileGameHistoryItem: React.FC<FriendProps> = ({ history }) => {
	const user = useRecoilValue(profileState);

	const borderColor =
		user.user?.id === history.winner.id ? 'bg-blue-500' : 'bg-red-500';
	const bgColor =
		user.user?.id === history.winner.id ? 'bg-sky-100' : 'bg-rose-100';
	const playDate: number = Math.floor(
		(Date.now() - Date.parse(history.playDate.toString())) /
			(24 * 60 * 60 * 1000)
	);
	const seconds = Math.floor(history.playTime / 1000);

	return (
		<div className='w-[672px] h-[200px] flex-col  justify-start items-center gap-2 inline-flex'>
			<div
				className={`w-[672px] ${bgColor} rounded-xl justify-between items-center inline-flex`}
			>
				<div className='pr-6 justify-start items-center gap-2 flex'>
					<div className={`w-2 h-[120px] rounded-l-lg  ${borderColor}`} />
					<div className='flex-col justify-center items-start gap-1 inline-flex'>
						<div className="text-black text-xs font-bold font-['Inter'] leading-[18px]">
							{history.mode === GameMode.NORMAL ? '클래식' : '스피드'}
						</div>
						<div className="text-black text-xs font-normal font-['Inter'] leading-[18px]">
							{playDate < 1 ? '오늘' : playDate + '일 전'}
						</div>
						<div className='self-stretch h-px bg-gray-300 rounded-full' />
						<div className="text-black text-xs font-bold font-['Inter'] leading-[18px]">
							{user.user?.id === history.winner.id ? '승리' : '패배'}
						</div>
						<div className="text-black text-xs font-normal font-['Inter'] leading-[18px]">
							{Math.floor(seconds / 60) + ':' + (seconds % 60) + '’'}
						</div>
					</div>
				</div>
				<div className='grow shrink basis-0 h-[120px] justify-center items-center gap-6 flex'>
					<div className='justify-start items-center gap-2 flex'>
						<div className="text-black text-lg font-normal font-['Inter'] leading-[27px]">
							{user.user?.nickname}
						</div>
						<Avatar img={user.user?.avatarPath || ''} rounded size='lg' />
					</div>
					<div className='h-[33px] p-1 bg-yellow-400 rounded-xl justify-center items-center gap-1 flex'>
						<div className="text-white text-xl font-bold font-['Inter'] leading-[25px]">
							{user.user?.id === history.winner.id
								? history.winScore
								: history.loseScore}
						</div>
						<div className="text-white text-xl font-bold font-['Inter'] leading-[25px]">
							-
						</div>
						<div className="text-white text-xl font-bold font-['Inter'] leading-[25px]">
							{user.user?.id === history.loser.id
								? history.winScore
								: history.loseScore}
						</div>
					</div>
					<div className='justify-start items-center gap-2 flex'>
						<Avatar
							img={
								(user.user?.id === history.loser.id
									? history.loser.avatarPath
									: history.winner.avatarPath) || ''
							}
							rounded
							size='lg'
						/>
						<div className="text-black text-lg font-normal font-['Inter'] leading-[27px]">
							{user.user?.id === history.winner.id
								? history.loser.nickname
								: history.winner.nickname}
						</div>
					</div>
				</div>
				{/* <div className='w-10 h-[120px] px-2 pt-[90px] pb-1.5 bg-sky-100 flex-col justify-end items-center inline-flex'>
					<div className='w-6 h-6 p-[3px] rounded-lg justify-center items-center inline-flex'>
						<div className='w-[18px] h-[18px] relative flex-col justify-start items-start flex' />
					</div>
				</div> */}
			</div>
		</div>
	);
};

export default ProfileGameHistoryItem;
