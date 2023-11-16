import { useRecoilValue } from 'recoil';
import { profileState } from 'ts/states/profile/profile-state';

const ProfileBioNoraml = () => {
	const profile = useRecoilValue(profileState);
	const user = profile.user;

	console.log(user);
	return (
		<div className='flex flex-col items-start gap-3'>
			<div className='font-bold text-sm'>{user?.intraId}</div>
			{user?.bio && <div className='text-sm'>{user?.bio}</div>}
		</div>
	);
};

export default ProfileBioNoraml;
