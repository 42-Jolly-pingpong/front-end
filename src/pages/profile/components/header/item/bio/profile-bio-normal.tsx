import { useRecoilValue } from 'recoil';
import { profileState } from 'ts/states/profile/profile-state';

const ProfileBioNoraml = () => {
	const profile = useRecoilValue(profileState);
	const user = profile.user;

	return (
		<div className='flex flex-col items-start'>
			<div className='font-bold pb-2 text-sm'>{user?.intraId}</div>
			<div className='min-h-6'>{user?.bio}</div>
		</div>
	);
};

export default ProfileBioNoraml;
