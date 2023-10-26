import User from 'ts/interfaces/user.model';
import ProfileFriendRequestItem from 'pages/profile/components/tab/item/friend/profile-friend-request-item';

interface RequestListProps {
	requestFriends: User[];
}

const ProfileFriendRequestList: React.FC<RequestListProps> = ({
	requestFriends,
}) => {
	if (requestFriends === null) {
		return;
	}
	return (
		<div className='flex flex-col items-center'>
			{requestFriends.map((requestFriends: User) => (
				<ProfileFriendRequestItem
					user={requestFriends}
					key={requestFriends.id}
				/>
			))}
		</div>
	);
};

export default ProfileFriendRequestList;
