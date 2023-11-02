import { useRecoilValue } from 'recoil';
import GrayButton from 'components/button/gray-button';
import { useState } from 'react';
import { userState } from 'ts/states/user-state';
import ProfileEditModal from 'pages/profile/components/modal/profile-edit-modal';

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
		<div className='flex items-center min-w-80 min-h-8'>
			<div className='text-xl text-center pr-5'>{user?.nickname}</div>
			<GrayButton size='xs' onClick={handleClick}>
				<div className='font-bold'>프로필 편집</div>
			</GrayButton>
			<ProfileEditModal show={modalState} onClose={handleClose} />
		</div>
	);
};

export default ProfileSocialMine;
