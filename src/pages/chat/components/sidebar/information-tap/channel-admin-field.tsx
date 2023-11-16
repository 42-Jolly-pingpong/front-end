import useChangeSidebar from 'hooks/use-change-sidebar';
import ChannelPropertyContent from 'pages/chat/components/sidebar/channel-property-content';
import ChannelPropertyTitle from 'pages/chat/components/sidebar/channel-property-title';
import { useRecoilValue } from 'recoil';
import { ChatParticipantRole } from 'ts/enums/chat-participants-role.enum';
import { ChatParticipant } from 'ts/interfaces/chat-participant.model';
import { ChatRoom } from 'ts/interfaces/chat-room.model';
import { chatState } from 'ts/states/chat-state';

const ChannelAdminField = () => {
	const chat = useRecoilValue(chatState).chatRoom as ChatRoom;
	const setProfile = useChangeSidebar('profile');

	const onClickAdmin = (admin: ChatParticipant) => {
		setProfile(admin.user);
	};

	const adminButton = (admin: ChatParticipant) => {
		return (
			<button
				className='text-blue-700 text-xs font-normal hover:underline'
				onClick={() => onClickAdmin(admin)}
			>
				{admin.user.nickname}
			</button>
		);
	};

	const adminsToOneElement = (admins: ChatParticipant[]) => {
		const allAdmins = admins.map((admin, id) => (
			<button
				className='text-blue-700 text-xs font-normal hover:underline'
				onClick={() => onClickAdmin(admin)}
				key={id}
			>
				{admin.user.nickname}
			</button>
		));
		const delimeter = ',';
		return (
			<div className='flex flex-wrap text-sm font-normal'>
				{allAdmins.map((admin, id) => (
					<div className='flex flex-wrap' key={id}>
						{id !== 0 ? <div className='flex'>{delimeter}&nbsp;</div> : null}
						<div>{admin}</div>
					</div>
				))}
			</div>
		);
	};

	const admins = () => {
		const allAdmins = chat.participants.filter(
			(participant) =>
				participant.role === ChatParticipantRole.ADMIN ||
				participant.role === ChatParticipantRole.OWNER
		);

		if (allAdmins.length === 0) {
			<ChannelPropertyContent label='이 채널에는 아직 채널 관리자가 없습니다.' />;
		} else if (allAdmins.length === 1) {
			return adminButton(allAdmins[0]);
		} else return adminsToOneElement(allAdmins);
	};

	return (
		<div className='mt-4 px-5 py-4 bg-white rounded-t-xl'>
			<ChannelPropertyTitle label='관리자' />
			<div className='mt-1'>{admins()}</div>
		</div>
	);
};

export default ChannelAdminField;
