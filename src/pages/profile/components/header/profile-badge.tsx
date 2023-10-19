import { useRecoilValue } from 'recoil';
import { profileState } from 'ts/states/profile-state';

const ProfileBadge = () => {
	const profile = useRecoilValue(profileState);

	return <div> 프로필 뱃지 올 자리 </div>;
};

export default ProfileBadge;
