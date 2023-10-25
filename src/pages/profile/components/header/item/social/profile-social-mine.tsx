import GrayButton from 'components/button/gray-button';
import { FiSettings } from 'react-icons/fi';
import { useRecoilValue } from 'recoil';
import { profileState } from 'ts/states/profile/profile-state';

const ProfileSocialMine = () => {
	const profile = useRecoilValue(profileState);

	const handleEdit = () => {
		console.log('edit 버튼 누름');
	};

	const handleLogout = () => {
		console.log('logout 로직');
	};

	return (
		<div className='flex items-center min-w-80 min-h-8'>
			<div className='text-xl text-center pr-5'>{profile.user?.nickname}</div>
			<GrayButton size='xs' onClick={handleEdit}>
				<div className='font-bold'>프로필 편집</div>
			</GrayButton>
			<div className='pr-2' />
			<FiSettings onClick={handleLogout} className='hover:cursor-pointer' />
		</div>
	);
};

export default ProfileSocialMine;
