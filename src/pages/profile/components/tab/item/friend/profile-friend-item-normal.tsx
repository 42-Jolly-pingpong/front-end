import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import { Avatar } from 'flowbite-react';
import User from 'ts/interfaces/user.model';
import { profileState } from 'ts/states/profile/profile-state';
import { ProfileFriendStatus } from 'ts/enums/profile/profile-friend-status.enum';
import ProfileFriendButton from 'pages/profile/components/tab/button/profile-friend-button';

interface FriendProps {
	user: User;
}

const ProfileFriendItemNormal: React.FC<FriendProps> = ({ user }) => {
	const profile = useRecoilValue(profileState);
	const [relation, setRelation] = useState<ProfileFriendStatus>(
		ProfileFriendStatus.UNKNOWN
	);

	// [api 친구와 나와의 관계]
	useEffect(() => {
		const fetchRelation = async () => {
			setRelation(await getFriendRelation());
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
				<ProfileFriendButton
					profileUser={profile.user!}
					relation={relation}
					onClick={handleClick}
				/>
			</div>
		</>
	);
};

export default ProfileFriendItemNormal;
