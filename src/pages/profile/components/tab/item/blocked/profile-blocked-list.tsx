import User from 'ts/interfaces/user.model';
import ProfileFriendRequestItem from 'pages/profile/components/tab/item/friend/profile-friend-request-item';

interface BlockedListProps {
	blockedUsers: User[];
}

const ProfileBlockedList: React.FC<BlockedListProps> = ({ blockedUsers }) => {
	return (
		<div className='flex flex-col items-center'>
			{blockedUsers.map((blocked: User) => (
				<ProfileFriendRequestItem user={blocked} key={blocked.id} />
			))}
		</div>
	);
};

export default ProfileBlockedList;
