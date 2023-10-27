import GrayButton from 'components/button/gray-button';
import YellowButton from 'components/button/yellow-button';
import { ProfileStatus } from 'ts/enums/profile/profile-status.enum';

interface FriendButtonProps {
	relation: ProfileStatus;
	onClick: () => void;
}

const ProfileFriendButton: React.FC<FriendButtonProps> = ({
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
