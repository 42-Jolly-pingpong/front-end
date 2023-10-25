import { useRecoilValue } from 'recoil';
import { profileState } from 'ts/states/profile/profile-state';

const ProfileSocialNormal = () => {
	const profile = useRecoilValue(profileState);
	return <div></div>;
	//const
	//// 친구(회색), 친구 요청됨(회색) , +친구 추가(노랑), 차단됨(빨강)

	//return (
	//	<div className='flex items-center h-9'>
	//		<div className='text-xl text-center pr-5'>{profile.user?.nickname}</div>
	//		<GrayButton size='xs' onClick={handleEdit}>
	//			<div className='font-bold'>프로필 편집</div>
	//		</GrayButton>
	//		<div className='pr-2' />
	//		<FiSettings onClick={handleLogout} className='hover:cursor-pointer' />
	//	</div>
	//);
};

export default ProfileSocialNormal;
