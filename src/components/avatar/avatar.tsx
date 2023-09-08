import { useNavigate } from 'react-router-dom';
import { User } from 'ts/interfaces/user.model';

const Avatar = (props: { user: User }) => {
	const context = useNavigate();

	const { user } = props;

	const onClickAvatar = () => {
		context(`/users/${user.idx}`);
	};

	return (
		<button onClick={onClickAvatar}>
			<img
				src={user.avatarPath}
				alt='Avatar'
				className='rounded-full w-12 h-12 mr-3'
			/>
		</button>
	);
};

export default Avatar;
