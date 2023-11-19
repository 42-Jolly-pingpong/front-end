import {
	AiOutlineUser,
	AiOutlineUserAdd,
	AiOutlineUserDelete,
	AiOutlineUsergroupDelete,
} from 'react-icons/ai';
import GameCustomButton from 'components/button/\bgame-custom-button';
import { ProfileStatus } from 'ts/enums/profile/profile-status.enum';

interface ButtonProps {
	relation: ProfileStatus;
	onClick: () => void;
}

const GameFriendButton: React.FC<ButtonProps> = ({ relation, onClick }) => {
	const handleClick = () => {
		onClick();
	};

	switch (relation) {
		case ProfileStatus.UNDEFINED:
			return (
				<GameCustomButton
					icon={<AiOutlineUserAdd size='23px' color='#FDCE02' />}
					message='친구 신청'
					onClick={handleClick}
				/>
			);
		case ProfileStatus.FRIEND:
			return (
				<GameCustomButton
					icon={<AiOutlineUserDelete size='23px' color='#FDCE02' />}
					message='친구 삭제'
					onClick={handleClick}
				/>
			);
		case ProfileStatus.BLOCKEDBYME:
			return (
				<GameCustomButton
					icon={<AiOutlineUsergroupDelete size='23px' color='#FDCE02' />}
					message='차단 해제'
					onClick={handleClick}
				/>
			);
		case ProfileStatus.REQUESTEDBYME:
			return (
				<GameCustomButton
					icon={<AiOutlineUserDelete size='23px' color='#FDCE02' />}
					message='요청 취소'
					onClick={handleClick}
				/>
			);
		case ProfileStatus.REQUESTEDBYOTHER:
			return (
				<GameCustomButton
					icon={<AiOutlineUser size='23px' color='#FDCE02' />}
					message='수락 대기중'
				/>
			);
		default:
			return;
	}
};

export default GameFriendButton;
