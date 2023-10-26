import { ProfileFriendStatus } from 'ts/enums/profile/profile-friend-status.enum';
import User from 'ts/interfaces/user.model';

interface FriendButtonProps {
	profileUser: User;
	relation: ProfileFriendStatus;
	onClick: () => void;
}

const ProfileFriendButton: React.FC<FriendButtonProps> = ({
	profileUser,
	relation,
	onClick,
}) => {
	return <div></div>;
};
export default ProfileFriendButton;

{
	/*<GrayButton size='xs' onClick={handleClick}>
					친구 끊기
				</GrayButton>*/
}
