import { User } from 'ts/interfaces/user.model';

const UserShortProfile = (props: { user: User }) => {
	const { user } = props;

	return (
		<div className='flex items-center'>
			<img
				src={user.avatarPath}
				alt='Avatar'
				className='rounded-full w-32 h-32'
			/>
			<h3>{user.nickname}</h3>
		</div>
	);
};

export default UserShortProfile;
