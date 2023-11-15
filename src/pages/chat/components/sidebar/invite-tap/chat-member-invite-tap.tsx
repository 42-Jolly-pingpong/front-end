import { useEffect, useState } from 'react';
import { ChatParticipant } from 'ts/interfaces/chat-participant.model';
import { ChatRoom } from 'ts/interfaces/chat-room.model';
import { HiArrowUturnLeft } from 'react-icons/hi2';
import { ChatParticipantStatus } from 'ts/enums/chat-participants-status.enum';
import { useRecoilValue } from 'recoil';
import { chatState } from 'ts/states/chat-state';
import User from 'ts/interfaces/user.model';
import { userFriendsState } from 'ts/states/user/user-friends-state';
import InviteSearchFriend from 'pages/chat/components/sidebar/invite-tap/invite-seach-friend';
import InChannelList from 'pages/chat/components/sidebar/invite-tap/in-channel-list';
import NotInChannelList from 'pages/chat/components/sidebar/invite-tap/not-in-channel-list';

const ChatMemberInviteTap = (props: {
	setIsInquireTap: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const chat = useRecoilValue(chatState).chatRoom as ChatRoom;
	const [input, setInput] = useState<string>('');
	const friendList = useRecoilValue(userFriendsState).friends as User[];
	const [memberList, setMemberList] = useState<ChatParticipant[]>([]);
	const [notMemberList, setNotMemberList] = useState<User[]>([]);

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
									participant.status === ChatParticipantStatus.MUTED ||
									participant.status === ChatParticipantStatus.BANNED)
						) && friend.nickname.includes(input)
				)
				.sort((a, b) => a.nickname.localeCompare(b.nickname))
		);
	}, [friendList, input, chat]);

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
			<InviteSearchFriend input={input} setInput={setInput} />
			<div className='flex flex-col w-full overflow-y-auto'>
				<InChannelList memberList={memberList} />
				<NotInChannelList notMemberList={notMemberList} />
			</div>
			{returnButton()}
		</div>
	);
};

export default ChatMemberInviteTap;
