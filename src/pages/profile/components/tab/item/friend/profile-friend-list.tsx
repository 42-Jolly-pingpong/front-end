import User from 'ts/interfaces/user.model';
import ProfileFriendItem from 'pages/profile/components/tab/item/friend/profile-friend-item-mine';
import { useRecoilValue } from 'recoil';
import { profileState } from 'ts/states/profile/profile-state';
import { ProfileStatus } from 'ts/enums/profile/profile-status.enum';
import ProfileFriendItemMine from 'pages/profile/components/tab/item/friend/profile-friend-item-mine';

interface FriendListProps {
	friends: User[];
}

const ProfileFriendRequestList: React.FC<FriendListProps> = ({ friends }) => {
	const profile = useRecoilValue(profileState);

	if (profile.type === ProfileStatus.MINE) {
		return (
			<div className='flex flex-col items-center'>
				{friends.map((friend: User) => (
					<ProfileFriendItemMine user={friend} key={friend.id} />
				))}
			</div>
		);
	} else {
		return (
			<div className='flex flex-col items-center'>
				{friends.map((friend: User) => (
					<ProfileFriendItem user={friend} key={friend.id} />
				))}
			</div>
		);
	}
};

export default ProfileFriendRequestList;
