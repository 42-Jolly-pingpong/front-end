import { chatSocket } from 'socket/chat-socket';
import MemberInfo from 'pages/chat/components/sidebar/member-info';
import NoResult from 'pages/chat/components/sidebar/no-result';
import { useRecoilValue } from 'recoil';
import { ChatRoom } from 'ts/interfaces/chat-room.model';
import User from 'ts/interfaces/user.model';
import { chatState } from 'ts/states/chat-state';

const NotInChannelList = (props: { notMemberList: User[] }) => {
	const chat = useRecoilValue(chatState).chatRoom as ChatRoom;

	const { notMemberList } = props;

	const onClickAddUser = (user: User) => {
		chatSocket.emit('inviteUser', {
			roomId: chat.id,
			participants: [user.id],
		});
	};

	if (notMemberList.length === 0) {
		return (
			<div className='flex flex-col w-full bg-gray-100 pb-3'>
				<div className='px-3 py-3 text-xs font-bold text-gray-600'>
					이 채널에 없음
				</div>
				<NoResult />
			</div>
		);
	}
	return (
		<div className='flex flex-col w-full bg-gray-100'>
			<div className='px-3 py-3 text-xs font-bold text-gray-600'>
				이 채널에 없음
			</div>
			{notMemberList.map((user, id) => (
				<div
					className='p-3 flex items-center justify-between w-full hover:bg-gray-200'
					key={id}
				>
					<MemberInfo user={user} isMe={false} />
					<button
						className='text-sm font-medium text-blue-600 hover:underline'
						onClick={() => onClickAddUser(user)}
					>
						추가
					</button>
				</div>
			))}
		</div>
	);
};

export default NotInChannelList;
