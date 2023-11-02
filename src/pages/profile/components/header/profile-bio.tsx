import { useRecoilValue } from 'recoil';
import { profileState } from 'ts/states/profile-state';

const ProfileBio = () => {
	const profile = useRecoilValue(profileState);

	return (
		<div className='flex flex-col justify-start'>
			<div>{profile?.intraId}</div>
			<div>{profile?.bio}</div>
		</div>
	);
};

export default ProfileBio;
