import { Modal } from 'flowbite-react';
import { useRecoilValue } from 'recoil';
import { userState } from 'ts/states/user-state';
import GoogleIcon from 'images/google.png';
import GrayButton from 'components/button/gray-button';
import ProfileEditHeader from 'pages/profile/components/modal/item/profile-edit-header';
import ProfileEditEmail from 'pages/profile/components/modal/item/profile-edit-email';
import ProfileEditAvatar from 'pages/profile/components/modal/item/profile-edit-avatar';
import ProfileEditBio from 'pages/profile/components/modal/item/profile-edit-bio';
import { useState } from 'react';
import UpdateUserDto from 'ts/interfaces/user/update-user.model';
import ProfileEditNickname from 'pages/profile/components/modal/item/profile-edit-nickname';
import YellowButton from 'components/button/yellow-button';
import ProfileEditAuth from 'pages/profile/components/modal/item/profile-edit-auth';

interface ModalProps {
	show: boolean;
	onEdit: () => void;
	onClose: () => void;
}

const ProfileEditModal: React.FC<ModalProps> = ({ show, onEdit, onClose }) => {
	const user = useRecoilValue(userState);
	const userData: UpdateUserDto = user!;
	const [updateUserDto, setUpdateUserDto] = useState<UpdateUserDto>(userData);

	const handleUpload = (avatarPath: string) => {
		setUpdateUserDto({ ...updateUserDto, avatarPath });
	};

	const handleBio = (bio: string) => {
		setUpdateUserDto({ ...updateUserDto, bio });
	};

	const handleNickname = (nickname: string) => {
		setUpdateUserDto({ ...updateUserDto, nickname });
	};

	const handleAuth = (auth: boolean) => {
		setUpdateUserDto({ ...updateUserDto, auth });
	};

	return (
		<Modal size='lg' show={show} onClose={onClose}>
			<ProfileEditHeader onClose={onClose} />
			<Modal.Body className='flex flex-col pt-0 px-8'>
				<ProfileEditAvatar onUpload={handleUpload} />
				<ProfileEditEmail />
				<ProfileEditNickname onChange={handleNickname} />
				<ProfileEditBio onChange={handleBio} />
				<ProfileEditAuth onChange={handleAuth} />
				<YellowButton size='2xl' onClick={onEdit}>
					<div className='p-2'>수정하기</div>
				</YellowButton>
			</Modal.Body>
		</Modal>
	);
};

export default ProfileEditModal;
