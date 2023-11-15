import ChannelPropertyContent from 'pages/chat/components/sidebar/setting-tap/channel-property-content';
import ChannelPropertyTitle from 'pages/chat/components/sidebar/setting-tap/channel-property-title';
import { ChatParticipant } from 'ts/interfaces/chat-participant.model';

const ChannelOwnerField = (props: { owner?: ChatParticipant }) => {
	const ownerNickname = props.owner ? props.owner.user.nickname : '';

	return (
		<div className='px-5 py-4 bg-white rounded-xl'>
			<ChannelPropertyTitle label='채널 소유주' />
			<div className='mt-1 flex items-center gray-900'>
				<ChannelPropertyContent label={ownerNickname} />
			</div>
		</div>
	);
};

export default ChannelOwnerField;
