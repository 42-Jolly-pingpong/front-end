import { Avatar } from 'flowbite-react';

interface Props {
	position: 'left' | 'right';
	nickname: string;
	avatarPath?: string;
}

const ProfileGameHistoryUser = ({ position, nickname, avatarPath }: Props) => {
	const isLeft = position === 'left';

	return (
		<div
			className={`flex justify-start items-center gap-2 ${
				isLeft && 'flex flex-row-reverse'
			}`}
		>
			<div className='text-lg truncate max-w-[140px]'>{nickname}</div>
			<Avatar img={avatarPath || ''} rounded size='lg' />
		</div>
	);
};

export default ProfileGameHistoryUser;
