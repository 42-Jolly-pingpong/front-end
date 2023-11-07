import { useState } from 'react';
import { Modal } from 'flowbite-react';
import { useRecoilState } from 'recoil';
import { userState } from 'ts/states/user-state';
import { profileState } from 'ts/states/profile/profile-state';
import UpdateUserDto from 'ts/interfaces/user/update-user.model';
import ProfileEditBio from 'pages/profile/components/modal/item/profile-edit-bio';
import ProfileEditAuth from 'pages/profile/components/modal/item/profile-edit-auth';
import ProfileEditEmail from 'pages/profile/components/modal/item/profile-edit-email';
import ProfileEditHeader from 'pages/profile/components/modal/item/profile-edit-header';
import ProfileEditAvatar from 'pages/profile/components/modal/item/profile-edit-avatar';
import ProfileEditButton from 'pages/profile/components/modal/item/profile-edit-button';
import ProfileEditNickname from 'pages/profile/components/modal/item/profile-edit-nickname';

interface ModalProps {
	show: boolean;
	onClose: () => void;
}

const ProfileEditModal: React.FC<ModalProps> = ({ show, onClose }) => {
	const [user, setUserState] = useRecoilState(userState);
	const userData: UpdateUserDto = user!;
	const [validate, setValidate] = useState(true);
	const [profile, setProfile] = useRecoilState(profileState);
	const [updateUserDto, setUpdateUserDto] = useState<UpdateUserDto>(userData);

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

	/**
	 *
	 * 2차 인증 핸들링 영억 (./profile-edit-auth)
	 * auth가 boolean에서 변할 수 있음 (레퍼런스 보니까 바뀌어야 함)
	 */
	const handleAuth = (auth: boolean) => {
		// 지금은 항상 false를 반환하고 있음.
		setUpdateUserDto({ ...updateUserDto, auth });
		setValidate(true);
	};

	const handleSubmit = async () => {
		console.log('이제 저장해야지');
		// 1. updateUserDto를 백엔드 api에 넘겨 저장
		//	-> src/api/user-api에 추가하면 됨(back-end에서 가드를 쓴다면, 헤더에 '꼭' 토큰 담아서 보내기. 다른 코드 참조)
		// 2. (recoil)userState update
		// 3. (recoil)profileState의 user update. type은 건드릴 거 없음.
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
				<ProfileEditButton onChange={handleSubmit} disabled={!validate} />
			</Modal.Body>
		</Modal>
	);
};

export default ProfileEditModal;
