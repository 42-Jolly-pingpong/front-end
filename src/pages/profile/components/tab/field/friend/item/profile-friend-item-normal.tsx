import { useState } from 'react';
import { Avatar } from 'flowbite-react';
import User from 'ts/interfaces/user.model';
import { ProfileStatus } from 'ts/enums/profile/profile-status.enum';
import ProfileFriendModal from 'pages/profile/components/modal/profile-friend-modal';
import ProfileUserInfo from 'pages/profile/components/tab/common/profile-user-info';
import ProfileFriendButton from 'pages/profile/components/button/profile-friend-button';

interface FriendProps {
	user: User;
	relation: ProfileStatus;
	onChangeRelation: (relation: ProfileStatus, otherId: number) => void;
}
const ProfileFriendItemNormal: React.FC<FriendProps> = ({
	user,
	relation,
	onChangeRelation,
}) => {
	const [modalState, setModalState] = useState(false);

	const handleClick = () => {
		setModalState(true);
	};

	const handleClose = () => {
		setModalState(false);
	};

	const handleChange = () => {
		onChangeRelation(relation, user.id);
		setModalState(false);
	};

	return (
		<>
			<div className='flex flex-row items-center py-4 border-b w-80'>
				<Avatar size='sm' img={user.avatarPath || ''} />
				<ProfileUserInfo nickname={user.nickname} email={user.email} />
				<div className='pr-3' />
				<ProfileFriendButton relation={relation} onClick={handleClick} />
				<ProfileFriendModal
					show={modalState}
					relation={relation}
					onRequest={handleChange}
					onClose={handleClose}
				/>
			</div>
		</>
	);
};

export default ProfileFriendItemNormal;
