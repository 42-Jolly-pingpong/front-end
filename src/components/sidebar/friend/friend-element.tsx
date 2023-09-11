import { User } from 'ts/interfaces/user.model';
import AnswerButton from 'components/sidebar/friend/answer-button';
import Avatar from 'components/avatar/avatar';

const FriendElement = (props: { user: User; request?: boolean }) => {
	const { user, request } = props;

	return (
		<div className='flex items-center m-1 justify-between'>
			<div className='flex items-center justify-start'>
				<Avatar user={user} size={12} />
				<div className='pl-3'>{user.nickname}</div>
			</div>
			{request ? <AnswerButton {...user} /> : null}
		</div>
	);
};

export default FriendElement;
