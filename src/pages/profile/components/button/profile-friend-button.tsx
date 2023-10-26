import GrayButton from 'components/button/gray-button';
import YellowButton from 'components/button/yellow-button';
import { ProfileStatus } from 'ts/enums/profile/profile-status.enum';
import User from 'ts/interfaces/user.model';

interface FriendButtonProps {
	profileUser: User;
	relation: ProfileStatus;
	onClick: () => void;
}

const ProfileFriendButton: React.FC<FriendButtonProps> = ({
	profileUser,
	relation,
	onClick,
}) => {
	switch (relation) {
		case ProfileStatus.MINE || ProfileStatus.FRIEND:
			return;
		case ProfileStatus.REQUESTED:
			return (
				<GrayButton size='xs' onClick={onClick}>
					<div>요청됨</div>
				</GrayButton>
			);
		case ProfileStatus.UNDEFINED:
			return (
				<YellowButton size='xs' onClick={onClick}>
					<div>+ 친구추가</div>
				</YellowButton>
			);
	}
};
export default ProfileFriendButton;

{
	/*<GrayButton size='xs' onClick={handleClick}>
					친구 끊기
				</GrayButton>*/
}
