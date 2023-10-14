import { useRecoilValue } from 'recoil';
import { profileState } from 'ts/states/profile-state';

const ProfileSocial = () => {
	const profile = useRecoilValue(profileState);

	return (
		<div className='flex text-bold'>
			<div>{profile?.nickname}</div>
			<div> 친구 추가 버튼</div>
			<div> 메시지 버튼</div>
			<div> 점 3개</div>
		</div>
	);
};

export default ProfileSocial;
