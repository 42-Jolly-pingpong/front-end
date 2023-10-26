import ProfileBlockedItem from 'pages/profile/components/tab/item/blocked/profile-blocked-item';
import User from 'ts/interfaces/user.model';

interface BlockedListProps {
	blockedUsers: User[];
}

const ProfileBlockedList: React.FC<BlockedListProps> = ({ blockedUsers }) => {
	console.log(blockedUsers);
	return (
		<div className='flex flex-col items-center'>
			{blockedUsers.map((blocked: User) => (
				<ProfileBlockedItem user={blocked} key={blocked.id} />
			))}
		</div>
	);
};

export default ProfileBlockedList;
