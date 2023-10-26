import User from 'ts/interfaces/user.model';
import ProfileFriendItem from 'pages/profile/components/tab/item/friend/profile-friend-item';

interface FriendListProps {
	friends: User[];
}

const ProfileFriendRequestList: React.FC<FriendListProps> = ({ friends }) => {
	return (
		<div className='flex flex-col items-center'>
			{friends.map((friend: User) => (
				<ProfileFriendItem user={friend} key={friend.id} />
			))}
		</div>
	);
};

export default ProfileFriendRequestList;
