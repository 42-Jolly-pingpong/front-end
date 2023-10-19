import { useNavigate } from 'react-router-dom';
import { User } from 'ts/interfaces/user.model';

const Avatar = (props: { user: User; size: number }) => {
	const context = useNavigate();

	const { user } = props;
	const isOnline = true;

	const onClickAvatar = () => {
		context(`/user-info/${user.nickname}`);
	};

	return (
		<button onClick={onClickAvatar}>
			<div
				className={`avatar ${isOnline ? 'online' : 'offline'} layout-icon w-${
					props.size
				} h-${props.size}`}
			>
				<img src={user.avatarPath} alt='Avatar' className='rounded-full' />
			</div>
		</button>
	);
};

export default Avatar;