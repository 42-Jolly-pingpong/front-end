import formattedDate from 'pages/chat/components/formatted-date';
import ChannelPropertyContent from 'pages/chat/components/sidebar/channel-property-content';
import ChannelPropertyTitle from 'pages/chat/components/sidebar/channel-property-title';
import { useRecoilValue } from 'recoil';
import { ChatParticipantRole } from 'ts/enums/chat-participants-role.enum';
import { ChatRoom } from 'ts/interfaces/chat-room.model';
import User from 'ts/interfaces/user.model';
import { chatState } from 'ts/states/chat-state';
import { userState } from 'ts/states/user-state';

const ChannelOwnerInfoField = () => {
	const user = useRecoilValue(userState) as User;
	const chat = useRecoilValue(chatState).chatRoom as ChatRoom;
	const owner = chat.participants.find(
		(participant) => participant.role === ChatParticipantRole.OWNER
	);

	return (
		<div
			className={`px-5 py-4 bg-white border-t ${
				owner?.user.id === user.id ? 'rounded-b-xl' : ' border-b'
			} text-left`}
		>
			<ChannelPropertyTitle label='만든 사람' />
			<div className='mt-1 flex items-center'>
				<ChannelPropertyContent
					label={`작성자: ${owner?.user.nickname} 작성 날짜:`}
				/>
				&nbsp;
				<ChannelPropertyContent label={formattedDate(chat.createdAt, true)} />
			</div>
		</div>
	);
};

export default ChannelOwnerInfoField;
