import { TextInput } from 'flowbite-react';
import MemberItem from 'pages/chat/components/sidebar/member-item';
import { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { ChatParticipant } from 'ts/interfaces/chat-participant.model';
import { ChatRoom } from 'ts/interfaces/chat-room.model';
import { User } from 'ts/interfaces/user.model';
import userData from 'ts/mock/user-data';
import { HiArrowUturnLeft } from 'react-icons/hi2';

const ChatMemberInviteTap = (props: {
	chat: ChatRoom;
	setIsInquireTap: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const [input, setInput] = useState<string>('');
	const [friendList, setFriendList] = useState<User[]>([]);
	const [memberList, setMemberList] = useState<ChatParticipant[]>([]);
	const [notMemberList, setNotMemberList] = useState<User[]>([]);

	const { chat } = props;

	useEffect(() => {
		//temp
		setFriendList([userData[0], userData[1]]);
	}, []);

	useEffect(() => {
		if (input.length === 0) {
			setMemberList(
				chat.participants.filter((participant) =>
					friendList.some((friend) => friend.id === participant.user.id)
				)
			);
			setNotMemberList(
				friendList.filter((friend) =>
					chat.participants.some(
						(participant) => participant.user.id !== friend.id
					)
				)
			);
		}
		setMemberList(
			chat.participants.filter(
				(participant) =>
					friendList.some((friend) => friend.id === participant.user.id) &&
					participant.user.nickname.includes(input)
			)
		);
		setNotMemberList(
			friendList.filter(
				(friend) =>
					chat.participants.some(
						(participant) => participant.user.id !== friend.id
					) && friend.nickname.includes(input)
			)
		);
	}, [friendList, input]);

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

	const inChannelList = () => {
		return (
			<div className=''>
				<div className='p-3 text-xs font-bold text-gray-600'>이 채널에서</div>
				{memberList.map((member, id) => (
					<div
						className='px-4 py-3 flex items-center justify-between w-full hover:bg-gray-200'
						key={id}
					>
						<MemberItem user={member.user} />
					</div>
				))}
			</div>
		);
	};

	const onClickAddUser = (user: User) => {
		//temp
	};

	const notInChannelList = () => {
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
						<MemberItem user={user} />
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
