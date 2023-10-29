import GrayButton from 'components/button/gray-button';
import RedButton from 'components/button/red-button';
import YellowButton from 'components/button/yellow-button';
import { ProfileStatus } from 'ts/enums/profile/profile-status.enum';

interface SocialButtonProps {
	relation: ProfileStatus;
	onClick: () => void;
}

const ProfileHeaderSocialButton: React.FC<SocialButtonProps> = ({
	relation,
	onClick,
}) => {
	switch (relation) {
		case ProfileStatus.FRIEND:
			return (
				<GrayButton size='xs' onClick={onClick}>
					친구
				</GrayButton>
			);
		case ProfileStatus.REQUESTED:
			return (
				<GrayButton size='xs' onClick={onClick}>
					친구 요청됨
				</GrayButton>
			);
		case ProfileStatus.UNDEFINED:
			return (
				<YellowButton size='xs' onClick={onClick}>
					+ 친구추가
				</YellowButton>
			);
		case ProfileStatus.BLOCKEDBYME:
			return (
				<RedButton size='xs' onClick={onClick}>
					차단됨
				</RedButton>
			);
		default:
			return;
	}
};

export default ProfileHeaderSocialButton;
