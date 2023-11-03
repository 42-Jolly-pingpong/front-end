import { Button } from 'flowbite-react';
import RedButton from 'components/button/red-button';
import GrayButton from 'components/button/gray-button';
import YellowButton from 'components/button/yellow-button';
import { ProfileStatus } from 'ts/enums/profile/profile-status.enum';
import { BiPlus } from 'react-icons/bi';

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
		case ProfileStatus.REQUESTEDBYME:
			return (
				<GrayButton size='xs' onClick={onClick}>
					친구 요청됨
				</GrayButton>
			);
		case ProfileStatus.REQUESTEDBYOTHER:
			return (
				<Button
					className='text-black bg-gray-200 enabled:hover:bg-gray-200 focus:ring-0  border-gray-200 border-2 cursor-not-allowed'
					size='xs'
				>
					수락 대기중
				</Button>
			);
		case ProfileStatus.UNDEFINED:
			return (
				<YellowButton size='xs' onClick={onClick}>
					<div className='flex flex-row items-center justify-center font-bold'>
						<BiPlus size='16' />
						<div className='text-xs pl-1'>친구 추가</div>
					</div>
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
