import { useRecoilValue } from 'recoil';
import GrayButton from 'components/button/gray-button';
import { profileState } from 'ts/states/profile/profile-state';

const ProfileSocialMine = () => {
	const profile = useRecoilValue(profileState);

	const handleEdit = () => {
		console.log('edit 버튼 누름');
	};

	return (
		<div className='flex items-center min-w-80 min-h-8'>
			<div className='text-xl text-center pr-5'>{profile.user?.nickname}</div>
			<GrayButton size='xs' onClick={handleEdit}>
				<div className='font-bold'>프로필 편집</div>
			</GrayButton>
		</div>
	);
};

export default ProfileSocialMine;
