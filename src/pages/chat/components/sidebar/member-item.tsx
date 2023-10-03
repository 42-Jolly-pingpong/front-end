import UserImg from 'pages/chat/components/user-img';
import { ChatParticipant } from 'ts/interfaces/chat-participant.model';

const MemberItem = (props: { participant: ChatParticipant }) => {
	return (
		<div className='flex items-center '>
			<UserImg src={props.participant.user.avatarPath} size={8} />
			<div className='text-sm font-bold text-gray-900 mx-2'>
				{props.participant.user.nickname}
			</div>
		</div>
	);
};

export default MemberItem;
