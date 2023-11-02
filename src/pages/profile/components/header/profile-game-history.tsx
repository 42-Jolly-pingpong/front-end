import { useRecoilValue } from 'recoil';
import { profileState } from 'ts/states/profile-state';

const ProfileGameHistory = () => {
	const profile = useRecoilValue(profileState);
	const totalGame = profile!.winCount + profile!.loseCount;

	return (
		<div className='flex justify-center'>
			<div> {totalGame} 경기 </div>
			<div>{profile?.winCount} 승리</div>
			<div>{profile?.loseCount} 패배</div>
		</div>
	);
};

export default ProfileGameHistory;
