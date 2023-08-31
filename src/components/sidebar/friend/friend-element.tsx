import { User } from 'ts/interfaces/user.model';
import AnswerButton from 'components/sidebar/friend/answer-button';

const FriendElement = (props: { user: User; request?: boolean }) => {
	const { user, request } = props;

	return (
		<div className='flex items-center m-1 justify-between'>
			<div className='flex items-center justify-start'>
				<img
					src={user.avatarPath}
					className='rounded-full layout-icon w-12 h-12 mr-3'
				/>
				{user.nickname}
			</div>
			{request ? <AnswerButton {...user} /> : null}
		</div>
	);
};

export default FriendElement;
