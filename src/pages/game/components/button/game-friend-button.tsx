import GameCustomButton from 'components/button/\bgame-custom-button';
import { AiOutlineUserAdd } from 'react-icons/ai';
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
					icon={<AiOutlineUserAdd size='23px' color='#FDCE02' />}
					message='친구 삭제'
					onClick={handleClick}
				/>
			);
		case ProfileStatus.BLOCKEDBYME:
			return (
				<GameCustomButton
					icon={<AiOutlineUserAdd size='23px' color='#FDCE02' />}
					message='차단 해제'
					onClick={handleClick}
				/>
			);
		case ProfileStatus.REQUESTEDBYME:
			return (
				<GameCustomButton
					icon={<AiOutlineUserAdd size='23px' color='#FDCE02' />}
					message='요청 취소'
					onClick={handleClick}
				/>
			);
		case ProfileStatus.REQUESTEDBYOTHER:
			return (
				<GameCustomButton
					icon={<AiOutlineUserAdd size='23px' color='#FDCE02' />}
					message='수락 대기중'
				/>
			);
		default:
			return;
	}
};

export default GameFriendButton;

//<button className='px-5 py-2.5 rounded-lg border border-yellow-400 hover:bg-gray-500 justify-center items-center gap-2 flex'>
//	<AiOutlineUserAdd size='23px' color='#FDCE02' />
//	<div className="text-yellow-400 text-sm font-medium font-['Inter'] leading-[21px]">
//		친구 신청
//	</div>
//</button>
