import User from 'ts/interfaces/user.model';
import ProfileFriendRequestItem from 'pages/profile/components/tab/item/friend/profile-friend-request-item';

interface RequestListProps {
	requestFriends: User[];
}

const ProfileFriendRequestList: React.FC<RequestListProps> = ({
	requestFriends,
}) => {
	return (
		<div className='flex flex-col items-center'>
			{requestFriends.map((friend: User) => (
				<ProfileFriendRequestItem user={friend} key={friend.id} />
			))}
		</div>
	);
};

export default ProfileFriendRequestList;
