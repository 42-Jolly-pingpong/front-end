import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import { Avatar } from 'flowbite-react';
import User from 'ts/interfaces/user.model';
import { profileState } from 'ts/states/profile/profile-state';
import ProfileFriendButton from 'pages/profile/components/button/profile-friend-button';
import { ProfileStatus } from 'ts/enums/profile/profile-status.enum';
import { getFriendRelation } from 'api/friend-api';

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
	}, []);

	const handleClick = () => {
		console.log('친구 삭제 API');
	};

	return (
		<>
			<div className='flex flex-row items-center py-4 border-b w-80'>
				<Avatar size='sm' img={user.avatarPath || ''} />
				<div className='flex flex-col w-48 pl-2'>
					<div className='text-base font-semibold'>{user.nickname}</div>
					<div className='text-xs text-gray-500'>{user.email}</div>
				</div>
				<div className='pl-3' />
				<ProfileFriendButton relation={relation} onClick={handleClick} />
			</div>
		</>
	);
};

export default ProfileFriendItemNormal;
