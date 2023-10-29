import { useRecoilValue } from 'recoil';
import GrayButton from 'components/button/gray-button';
import { profileState } from 'ts/states/profile/profile-state';
import { useState } from 'react';
import { userState } from 'ts/states/user-state';
import ProfileEditModal from 'pages/profile/components/modal/profile-edit-modal';

const ProfileSocialMine = () => {
	const user = useRecoilValue(userState);
	const profile = useRecoilValue(profileState);
	const [modalState, setModalState] = useState(false);

	const handleClick = () => {
		console.log('edit 버튼 누름');
		setModalState(true);
	};

	const handleEdit = () => {
		console.log('프로필 수정되겠지머');
		setModalState(false);
	};

	const handleClose = () => {
		setModalState(false);
	};

	return (
		<div className='flex items-center min-w-80 min-h-8'>
			<div className='text-xl text-center pr-5'>{profile.user?.nickname}</div>
			<GrayButton size='xs' onClick={handleClick}>
				<div className='font-bold'>프로필 편집</div>
			</GrayButton>
			<ProfileEditModal
				show={modalState}
				onEdit={handleEdit}
				onClose={handleClose}
			/>
		</div>
	);
};

export default ProfileSocialMine;
