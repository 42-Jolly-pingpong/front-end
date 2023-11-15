import { Avatar } from 'flowbite-react';
import { useRecoilValue } from 'recoil';
import { GameMode } from 'ts/enums/game/game-mode.enum';
import { GameHistory } from 'ts/interfaces/game-history.model';
import { profileState } from 'ts/states/profile/profile-state';
import ProfileGameHistoryBorder from './profile-game-history-border';

interface FriendProps {
	history: GameHistory;
}

const ProfileGameHistoryItem: React.FC<FriendProps> = ({ history }) => {
	const profile = useRecoilValue(profileState);

	const amIaWinner = profile.user?.id === history.winner.id;
	const leftUser = amIaWinner ? history.winner : history.loser;
	const rightUser = amIaWinner ? history.loser : history.winner;

	const playDate: number = Math.floor(
		(Date.now() - Date.parse(history.playDate.toString())) /
			(24 * 60 * 60 * 1000)
	);
	const seconds = Math.floor(history.playTime / 1000);

	return (
		<div
			className={`flex w-[672px] rounded-xl justify-between items-center ${
				amIaWinner ? 'bg-blue-100' : 'bg-red-100'
			}`}
		>
			<div className='flex justify-start items-center gap-2'>
				<ProfileGameHistoryBorder isWinner={amIaWinner} />
				<div className='flex flex-col justify-center items-start gap-1'>
					<div className='text-xs font-bold'>
						{history.mode === GameMode.NORMAL ? '클래식' : '스피드'}
					</div>
					<div className='text-xs'>
						{playDate < 1 ? '오늘' : playDate + '일 전'}
					</div>
					<div className='self-stretch h-px bg-gray-300 rounded-full' />
					<div className='text-xs font-bold'>
						{amIaWinner ? '승리' : '패배'}
					</div>
					<div className='text-xs'>
						{Math.floor(seconds / 60) + ':' + (seconds % 60) + '\u2019'}
					</div>
				</div>
			</div>
			{/* <div className='grow shrink basis-0 h-[120px] justify-center items-center gap-6 flex'> */}
			<div className='flex grow h-[120px] justify-center items-center gap-6'>
				<div className='justify-start items-center gap-2 flex '>
					<div className='text-lg truncate max-w-[140px]'>
						{leftUser.nickname}asdasldkjasldkjaslkdjaslkd
					</div>
					<Avatar img={leftUser.avatarPath || ''} rounded size='lg' />
				</div>
				<div className='flex px-3 py-1 bg-primary-700 rounded-xl justify-center items-center gap-1'>
					<div className='text-white text-xl font-bold'>
						{amIaWinner ? history.winScore : history.loseScore}
					</div>
					<div className='text-white text-xl font-bold'>-</div>
					<div className='text-white text-xl font-bold'>
						{!amIaWinner ? history.winScore : history.loseScore}
					</div>
				</div>
				<div className='justify-start items-center gap-2 flex '>
					<Avatar img={rightUser.avatarPath || ''} rounded size='lg' />
					<div className='text-lg truncate max-w-[140px]'>
						{rightUser.nickname}asdasldkjasldkjaslkdjaslkd
					</div>
				</div>
			</div>
			{/* <div className='w-10 h-[120px] px-2 pt-[90px] pb-1.5 bg-sky-100 flex-col justify-end items-center inline-flex'>
					<div className='w-6 h-6 p-[3px] rounded-lg justify-center items-center inline-flex'>
						<div className='w-[18px] h-[18px] relative flex-col justify-start items-start flex' />
					</div>
				</div> */}
		</div>
	);
};

export default ProfileGameHistoryItem;
