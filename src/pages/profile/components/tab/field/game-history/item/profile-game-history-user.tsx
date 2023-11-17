import { Avatar } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

interface Props {
	position: 'left' | 'right';
	nickname: string;
	avatarPath?: string;
}

const ProfileGameHistoryUser = ({ position, nickname, avatarPath }: Props) => {
	const navigate = useNavigate();
	const isLeft = position === 'left';

	const handleClick = () => {
		navigate(`/profile/${nickname}`);
	};

	return (
		<div
			className={`flex justify-start items-center gap-2 ${
				(isLeft && 'flex-row-reverse') || 'cursor-pointer'
			}`}
			onClick={handleClick}
		>
			<div className='text-lg truncate max-w-[140px]'>{nickname}</div>
			<Avatar img={avatarPath || ''} rounded size='lg' />
		</div>
	);
};

export default ProfileGameHistoryUser;
