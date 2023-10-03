import changeSidebar from 'hooks/change-sidebar';
import ChannelIcon from 'pages/chat/components/channel-icon';
import { ChatParticipantRole } from 'ts/enums/chat-participants-role.enum';
import { ChatParticipant } from 'ts/interfaces/chat-participant.model';
import { ChatRoom } from 'ts/interfaces/chat-room.model';

const ChatInformationTap = (props: { chat: ChatRoom }) => {
	const setProfile = changeSidebar('profile');
	const { chat } = props;
	const owner = chat.participants.find(
		(participant) => participant.role === ChatParticipantRole.OWNER
	);

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
					<ChannelIcon roomType={chat.roomType} />
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
				className='text-blue-700 text-xs font-normal'
				onClick={() => onClickAdmin(admin)}
			>
				{admin.user.nickname}
			</button>
		);
	};

	const adminsToOneElement = (admins: ChatParticipant[]) => {
		const allAdmins = admins.map((admin) => adminButton(admin));
		const delimeter = ', ';
		return (
			<div className='flex flex-wrap text-sm font-normal max-w-80'>
				{allAdmins.map((admin, id) => (
					<>
						{id !== 0 ? <div>{delimeter}</div> : null}
						{admin}
					</>
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
			<div className='px-5 py-4 bg-white border-t border-b text-left'>
				{title('만든 사람')}
				<div className='mt-1'>
					{content(`작성자: ${owner?.user.nickname} 작성 날짜: `)}
				</div>
			</div>
		);
	};

	const leaveField = () => {
		return (
			<button>
				<div className='px-5 py-4 bg-white rounded-b-xl hover:bg-gray-200 text-left'>
					<div className='text-sm font-bold text-red-500'>채널 삭제</div>
				</div>
			</button>
		);
	};
	return (
		<div className='flex flex-col w-full chat-right-sidebar-tap bg-gray-100 p-4'>
			{channelNameField()}
			{adminField()}
			{ownerField()}
			{leaveField()}
		</div>
	);
};

export default ChatInformationTap;
