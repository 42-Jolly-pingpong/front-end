import { User } from 'ts/interfaces/user.model';

const UserShortProfile = (props: { user: User }) => {
	const { user } = props;

	return (
		<div>
			<img src={user.avatarPath} alt='Avatar' className='rounded-full' />
			<h3>{user.nickname}</h3>
		</div>
	);
};

export default UserShortProfile;
