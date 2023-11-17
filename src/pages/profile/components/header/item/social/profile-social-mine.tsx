import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from 'ts/states/user-state';
import GrayButton from 'components/button/gray-button';
import ProfileEditModal from 'pages/profile/components/modal/profile-edit-modal';
import ProfileAuthModal from 'components/modal/profile-auth-modal';

const ProfileSocialMine = () => {
	const user = useRecoilValue(userState);
	const [modalState, setModalState] = useState(false);

	const handleClick = () => {
		setModalState(true);
	};

	const handleClose = () => {
		setModalState(false);
	};

	return (
		<div className='flex items-center w-72'>
			<div className='text-xl text-center pr-5'>{user?.nickname}</div>
			<GrayButton size='xs' onClick={handleClick}>
				<div className='font-bold'>프로필 편집</div>
			</GrayButton>
			<ProfileEditModal show={modalState} onClose={handleClose} />
			<ProfileAuthModal />
		</div>
	);
};

export default ProfileSocialMine;
