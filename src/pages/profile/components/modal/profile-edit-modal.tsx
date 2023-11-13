import { useState } from 'react';
import { Modal } from 'flowbite-react';
import { useRecoilState } from 'recoil';
import { userState } from 'ts/states/user-state';
import { profileState } from 'ts/states/profile/profile-state';
import UpdateUserDto from 'ts/interfaces/user/update-user.model';
import ProfileEditBio from 'pages/profile/components/modal/item/profile-edit-bio';
import ProfileEditAuth from 'pages/profile/components/modal/item/profile-edit-auth';
import ProfileEditEmail from 'pages/profile/components/modal/item/profile-edit-email';
import ProfileEditAvatar from 'pages/profile/components/modal/item/profile-edit-avatar';
import ProfileEditButton from 'pages/profile/components/modal/item/profile-edit-button';
import ProfileEditNickname from 'pages/profile/components/modal/item/profile-edit-nickname';
import sendAPI from 'api/sendAPI';
import User from 'ts/interfaces/user.model';

interface ModalProps {
	show: boolean;
	onClose: () => void;
}

const ProfileEditModal: React.FC<ModalProps> = ({ show, onClose }) => {
	const [user, setUserState] = useRecoilState(userState);
	const [validate, setValidate] = useState(false);
	const [profile, setProfile] = useRecoilState(profileState);
	const [updateUserDto, setUpdateUserDto] = useState<UpdateUserDto>(user!);

	const handleUpload = (avatarPath: string) => {
		setUpdateUserDto({ ...updateUserDto, avatarPath });
		setValidate(true);
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
		console.log('이제 저장해야지');
		// 1. updateUserDto를 백엔드 api에 넘겨 저장
		await sendAPI({
			method: 'PATCH',
			url: `/user/${user?.id}`,
			body: updateUserDto,
		});
		// 2. (recoil)userState update
		setUserState({ ...user, ...updateUserDto } as User);
		// 3. (recoil)profileState의 user update. type은 건드릴 거 없음.
		setProfile({
			...profile,
			user: { ...profile.user, ...updateUserDto } as User,
		});
	};

	return (
		<Modal size='lg' show={show} onClose={onClose}>
			<Modal.Header>프로필 편집</Modal.Header>
			{/* <ProfileEditHeader onClose={onClose} /> */}
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
