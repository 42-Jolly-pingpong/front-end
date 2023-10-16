import { Badge, TextInput } from 'flowbite-react';
import MemberItem from 'pages/chat/components/sidebar/member-item';
import { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { ChatParticipant } from 'ts/interfaces/chat-participant.model';
import { ChatRoom } from 'ts/interfaces/chat-room.model';
import { HiArrowUturnLeft } from 'react-icons/hi2';
import NoResult from 'pages/chat/components/sidebar/no-result';
import { ChatParticipantRole } from 'ts/enums/chat-participants-role.enum';
import useFetch from 'hooks/use-fetch';
import { ChatParticipantStatus } from 'ts/enums/chat-participants-status.enum';
import { useRecoilValue } from 'recoil';
import { chatState } from 'ts/states/chat-state';
import User from 'ts/interfaces/user.model';
import { chatSocket } from 'pages/chat/chat-socket';

const ChatMemberInviteTap = (props: {
	setIsInquireTap: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const chat = useRecoilValue(chatState).chatRoom as ChatRoom;
	const [input, setInput] = useState<string>('');
	const [friendList, setFriendList] = useState<User[]>([]);
	const [memberList, setMemberList] = useState<ChatParticipant[]>([]);
	const [notMemberList, setNotMemberList] = useState<User[]>([]);
	const getData = useFetch();

	useEffect(() => {
		setMemberList(
			chat.participants
				.filter(
					(participant) =>
						friendList.some((friend) => friend.id === participant.user.id) &&
						(participant.status === ChatParticipantStatus.DEFAULT ||
							participant.status === ChatParticipantStatus.MUTED) &&
						participant.user.nickname.includes(input)
				)
				.sort((a, b) => a.user.nickname.localeCompare(b.user.nickname))
		);
		setNotMemberList(
			friendList
				.filter(
					(friend) =>
						!chat.participants.some(
							(participant) =>
								participant.user.id === friend.id &&
								(participant.status === ChatParticipantStatus.DEFAULT ||
									participant.status === ChatParticipantStatus.MUTED)
						) && friend.nickname.includes(input)
				)
				.sort((a, b) => a.nickname.localeCompare(b.nickname))
		);
	}, [friendList, input, chat]);

	useEffect(() => {
		(async () => {
			await getData('get', '/friends')
				.then((res) => {
					if (res.ok) {
						return res.json();
					}
					throw Error(res.statusText);
				})
				.then((data: User[]) =>
					setFriendList(
						data.sort((a, b) => a.nickname.localeCompare(b.nickname))
					)
				)
				.catch((err) => console.log('get friend list', err));
		})();
	}, []);

	const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInput(e.target.value);
	};

	const searchInput = () => {
		return (
			<div className='p-4 border-b'>
				<TextInput
					icon={BiSearch}
					value={input}
					placeholder='멤버 추가하기'
					onChange={onChangeInput}
				/>
			</div>
		);
	};

	const roleBadge = (role: ChatParticipantRole) => {
		switch (role) {
			case ChatParticipantRole.OWNER:
				return <Badge color='pink'>소유주</Badge>;
			case ChatParticipantRole.ADMIN:
				return <Badge color='indigo'>관리자</Badge>;
			case ChatParticipantRole.MEMBER:
				return null;
		}
	};

	const inChannelList = () => {
		if (memberList.length === 0) {
			return (
				<div className='pb-3'>
					<div className='p-3 text-xs font-bold text-gray-600'>이 채널에서</div>
					<NoResult />
				</div>
			);
		}
		return (
			<div className=''>
				<div className='p-3 text-xs font-bold text-gray-600'>이 채널에서</div>
				{memberList.map((member, id) => (
					<div
						className='px-4 py-3 flex items-center w-full hover:bg-gray-200'
						key={id}
					>
						<MemberItem user={member.user} isMe={false} />
						<div className='ml-2'>{roleBadge(member.role)}</div>
					</div>
				))}
			</div>
		);
	};

	const onClickAddUser = (user: User) => {
		chatSocket.emit('inviteUser', {
			roomId: chat.id,
			participants: [user.id],
		});
	};

	const notInChannelList = () => {
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
						<MemberItem user={user} isMe={false} />
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

	const onClickReturn = () => {
		props.setIsInquireTap(true);
	};

	const returnButton = () => {
		return (
			<button
				className='flex justify-end items-center text-gray-800 h-16 text-sm'
				onClick={onClickReturn}
			>
				<HiArrowUturnLeft />
				<div className='mx-2'>멤버 목록으로 돌아가기</div>
			</button>
		);
	};

	return (
		<div className='flex flex-col w-full chat-right-sidebar-tap'>
			{searchInput()}
			<div className='flex flex-col w-full overflow-y-auto'>
				{inChannelList()}
				{notInChannelList()}
			</div>
			{returnButton()}
		</div>
	);
};

export default ChatMemberInviteTap;
