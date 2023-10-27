import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import { Avatar } from 'flowbite-react';
import User from 'ts/interfaces/user.model';
import { profileState } from 'ts/states/profile/profile-state';
import ProfileFriendButton from 'pages/profile/components/button/profile-friend-button';
import { ProfileStatus } from 'ts/enums/profile/profile-status.enum';
import { getFriendRelation } from 'api/friend-api';
import ProfileUserInfo from 'pages/profile/components/tab/common/profile-user-info';

interface FriendProps {
	user: User;
}

const ProfileFriendItemNormal: React.FC<FriendProps> = ({ user }) => {
	const profile = useRecoilValue(profileState);
	const [relation, setRelation] = useState<ProfileStatus>(
		ProfileStatus.UNKNOWN
	);

	useEffect(() => {
		const fetchRelation = async () => {
			setRelation(await getFriendRelation(profile.user!.id));
		};
		fetchRelation();
	}, [profile]);

	const handleClick = async () => {
		if (relation === ProfileStatus.REQUESTED) {
			setCancelModal(true);
		} else if (relation === ProfileStatus.UNDEFINED) {
			setFriendRequestModal(true);
		}
	};

	const handleClose = () => {
		setCancelModal(false);
		setFriendRequestModal(false);
	};

	return (
		<>
			<div className='flex flex-row items-center py-4 border-b w-80'>
				<Avatar size='sm' img={user.avatarPath || ''} />
				<ProfileUserInfo nickname={user.nickname} email={user.email} />
				<div className='pr-3' />
				<ProfileFriendButton relation={relation} onClick={handleClick} />
			</div>
		</>
	);
};

export default ProfileFriendItemNormal;
