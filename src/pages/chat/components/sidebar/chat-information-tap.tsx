import useChangeChat from 'hooks/use-change-chat';
import useChangeSidebar from 'hooks/use-change-sidebar';
import useChatAlert from 'hooks/use-chat-alert';
import { chatSocket } from 'pages/chat/chat-socket';
import ChannelIcon from 'pages/chat/components/channel-icon';
import formattedDate from 'pages/chat/components/formatted-date';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ChatParticipantRole } from 'ts/enums/chat-participants-role.enum';
import { ChatParticipant } from 'ts/interfaces/chat-participant.model';
import { ChatRoom } from 'ts/interfaces/chat-room.model';
import userData from 'ts/mock/user-data';
import { chatListState } from 'ts/states/chat-list.state';
import { chatState } from 'ts/states/chat-state';

const ChatInformationTap = () => {
	const setProfile = useChangeSidebar('profile');
	const chat = useRecoilValue(chatState).chatRoom as ChatRoom;
	const setChat = useChangeChat();
	const setChatList = useSetRecoilState(chatListState);
	const setAlertModal = useChatAlert();
	const owner = chat.participants.find(
		(participant) => participant.role === ChatParticipantRole.OWNER
	);

	const user = userData[0]; //temp

	const title = (label: string) => {
		return <div className='text-sm font-bold'>{label}</div>;
	};

	const content = (label: string) => {
		return <div className='text-sm font-normal gray-900'>{label}</div>;
	};

	const channelNameField = () => {
		return (
			<div className='px-5 py-4 bg-white rounded-xl'>
				{title('채널 이름')}
				<div className='mt-1 flex items-center gray-900'>
					<ChannelIcon roomType={chat.roomType} size={18} />
					{content(chat.roomName)}
				</div>
			</div>
		);
	};

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
			return content('이 채널에는 아직 채널 관리자가 없습니다.');
		} else if (allAdmins.length === 1) {
			return adminButton(allAdmins[0]);
		} else return adminsToOneElement(allAdmins);
	};

	const adminField = () => {
		return (
			<div className='mt-4 px-5 py-4 bg-white rounded-t-xl'>
				{title('관리자')}
				<div className='mt-1'>{admins()}</div>
			</div>
		);
	};

	const ownerField = () => {
		return (
			<div
				className={`px-5 py-4 bg-white border-t ${
					owner?.user.id === user.id ? 'rounded-b-xl' : ' border-b'
				} text-left`}
			>
				{title('만든 사람')}
				<div className='mt-1 flex items-center'>
					{content(`작성자: ${owner?.user.nickname} 작성 날짜:`)}
					&nbsp;
					{content(formattedDate(chat.createdAt, true))}
				</div>
			</div>
		);
	};

	const onClickLeave = async () => {
		chatSocket.emit(
			'participantLeave',
			{ roomId: chat.id },
			(response: { status: number; chatRoom: ChatRoom }) => {
				if (response.status === 200 && response.chatRoom) {
					setChatList((pre) => ({
						...pre,
						channelList: pre.channelList.filter(
							(channel) => channel.id !== response.chatRoom.id
						),
					}));
					setChat(null);
				} else {
					setAlertModal();
				}
			}
		);
	};

	const leaveField = () => {
		return (
			<button onClick={onClickLeave}>
				<div className='px-5 py-4 bg-white rounded-b-xl hover:bg-gray-200 text-left'>
					<div className='text-sm font-bold text-red-500'>채널에서 나가기</div>
				</div>
			</button>
		);
	};
	return (
		<div className='flex flex-col w-full chat-right-sidebar-tap bg-gray-100 p-4'>
			{channelNameField()}
			{adminField()}
			{ownerField()}
			{owner?.user.id !== user.id && leaveField()}
		</div>
	);
};

export default ChatInformationTap;
