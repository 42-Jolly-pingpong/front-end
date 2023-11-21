import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Modal } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { userState } from 'ts/states/user-state';
import { profileState } from 'ts/states/profile/profile-state';
import UpdateUserDto from 'ts/interfaces/user/update-user.model';
import ProfileEditBio from 'pages/profile/components/modal/item/profile-edit-bio';
import ProfileEditAuth from 'pages/profile/components/modal/item/profile-edit-auth';
import ProfileEditEmail from 'pages/profile/components/modal/item/profile-edit-email';
import ProfileEditAvatar from 'pages/profile/components/modal/item/profile-edit-avatar';
import ProfileEditButton from 'pages/profile/components/modal/item/profile-edit-button';
import ProfileEditNickname from 'pages/profile/components/modal/item/profile-edit-nickname';
import User from 'ts/interfaces/user.model';
import { updateUser } from 'api/user-api';

interface ModalProps {
	show: boolean;
	onClose: () => void;
}

const ProfileEditModal: React.FC<ModalProps> = ({ show, onClose }) => {
	const [user, setUserState] = useRecoilState(userState);
	const [validate, setValidate] = useState(false);
	const [profile, setProfile] = useRecoilState(profileState);
	const [updateUserDto, setUpdateUserDto] = useState<UpdateUserDto>(user!);
	const navigate = useNavigate();

	const handleUpload = (avatarPath: string) => {
		if (avatarPath) {
			setUpdateUserDto({ ...updateUserDto, avatarPath });
			setValidate(true);
		}
	};

	const handleBio = (bio: string) => {
		setUpdateUserDto({ ...updateUserDto, bio });
		setValidate(true);
	};

	const handleNickname = (nickname: string) => {
		if (nickname) {
			setUpdateUserDto({ ...updateUserDto, nickname });
			setValidate(true);
		} else {
			setValidate(false);
		}
	};

	const handleSubmit = async () => {
		await updateUser(updateUserDto);
		setUserState({ ...user, ...updateUserDto } as User);
		setProfile({
			...profile,
			user: { ...profile.user, ...updateUserDto } as User,
		});
	};

	useEffect(() => {
		navigate(`/profile/${user?.nickname}`);
	}, [profile]);

	return (
		<Modal size='lg' show={show} onClose={onClose}>
			<Modal.Header>프로필 편집</Modal.Header>
			<Modal.Body className='flex flex-col gap-6'>
				<ProfileEditAvatar onUpload={handleUpload} />
				<div className='flex flex-col gap-5 ml-5'>
					<ProfileEditEmail />
					<ProfileEditNickname onChange={handleNickname} />
					<ProfileEditBio onChange={handleBio} />
					<ProfileEditAuth />
				</div>
				<ProfileEditButton onChange={handleSubmit} disabled={!validate} />
			</Modal.Body>
		</Modal>
	);
};

export default ProfileEditModal;
