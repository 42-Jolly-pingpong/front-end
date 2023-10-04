import { Badge, Dropdown, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { ChatParticipant } from 'ts/interfaces/chat-participant.model';
import { ChatRoom } from 'ts/interfaces/chat-room.model';
import { BiDotsVerticalRounded, BiSearch } from 'react-icons/bi';
import { FiUserPlus } from 'react-icons/fi';
import { User } from 'ts/interfaces/user.model';
import userData from 'ts/mock/user-data';
import { ChatParticipantRole } from 'ts/enums/chat-participants-role.enum';
import MemberItem from 'pages/chat/components/sidebar/member-item';
import NoResult from 'pages/chat/components/sidebar/no-result';

const ChatMemberInquireTap = (props: {
	chat: ChatRoom;
	setIsInquireTap: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const { chat } = props;
	const [input, setInput] = useState<string>('');
	const [friendList, setFriendList] = useState<User[]>([]);
	const [blockedList, setBlockedList] = useState<User[]>([]);
	const [userRole, setUserRole] = useState<ChatParticipantRole>(
		ChatParticipantRole.MEMBER
	);
	const [searchedParticipant, setSearchedParticipant] = useState<
		ChatParticipant[]
	>([]);

	const user = userData[1]; //temp

	useEffect(() => {
		setBlockedList([userData[0]]);
		setFriendList([userData[0]]);
		const participant = chat.participants.find(
			(participant) => participant.user.id === user.id
		);
		if (participant) {
			setUserRole(participant.role);
		}
	}, []);

	useEffect(() => {
		if (input.length === 0) {
			setSearchedParticipant(chat.participants);
		} else {
			setSearchedParticipant(
				chat.participants.filter((participant) =>
					participant.user.nickname.includes(input)
				)
			);
		}
	}, [input]);

	const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInput(e.target.value);
	};

	const searchInput = () => {
		return (
			<div className='p-4 border-b'>
				<TextInput
					icon={BiSearch}
					value={input}
					placeholder='멤버 찾기'
					onChange={onChangeInput}
				/>
			</div>
		);
	};

	const onClickAddUser = () => {
		props.setIsInquireTap(false);
	};

	const addParticipant = () => {
		return (
			<button
				className='flex items-center w-full py-4 px-6 text-gray-900 hover:bg-gray-200'
				onClick={onClickAddUser}
			>
				<FiUserPlus />
				<div className='ml-3 text-sm font-bold'>사용자 추가</div>
			</button>
		);
	};

	const dotButton = () => {
		return (
			<div>
				<button className='rounded-lg flex items-stretch items-center justify-center p-2 text-center text-gray-900 bg-white border border-gray-300 enabled:hover:bg-gray-100 focus:ring-4 focus:ring-cyan-300 '>
					<BiDotsVerticalRounded size={12} />
				</button>
			</div>
		);
	};

	const onClickInviteGame = (otherUser: ChatParticipant) => {
		//temp
	};

	const inviteGame = (otherUser: ChatParticipant) => {
		return (
			<Dropdown.Item onClick={() => onClickInviteGame(otherUser)}>
				<div className='flex items-center font-normal text-sm text-gray-700'>
					게임 초대하기
				</div>
			</Dropdown.Item>
		);
	};

	const onClickManageFriend = (
		isFriend: boolean,
		otherUser: ChatParticipant
	) => {
		//temp
		if (isFriend) {
			//temp
			setFriendList((pre) =>
				pre.filter((friend) => friend.id !== otherUser?.user.id)
			);
			return;
		}
		setFriendList((pre) => [...pre, otherUser.user]);
	};

	const manageFriend = (isFriend: boolean, otherUser: ChatParticipant) => {
		return (
			<Dropdown.Item onClick={() => onClickManageFriend(isFriend, otherUser)}>
				<div className='flex items-center font-normal text-sm text-gray-700'>
					{isFriend ? '친구 제거하기' : '친구 신청하기'}
				</div>
			</Dropdown.Item>
		);
	};

	const onClickManageBlockList = (
		isBlocked: boolean,
		otherUser: ChatParticipant
	) => {
		//temp
		if (isBlocked) {
			//temp
			setBlockedList((pre) =>
				pre.filter((user) => user.id !== otherUser?.user.id)
			);
			return;
		}
		setBlockedList((pre) => [...pre, otherUser.user]);
	};

	const manageBlockList = (isBlocked: boolean, otherUser: ChatParticipant) => {
		return (
			<Dropdown.Item
				onClick={() => onClickManageBlockList(isBlocked, otherUser)}
			>
				<div className='flex items-center font-normal text-sm text-red-500'>
					{isBlocked ? '사용자 차단 해제하기' : '사용자 차단하기'}
				</div>
			</Dropdown.Item>
		);
	};

	const onClickManageAdminList = (
		isAdmin: boolean,
		otherUser: ChatParticipant
	) => {
		//temp
	};

	const manageAdminList = (isAdmin: boolean, otherUser: ChatParticipant) => {
		return (
			<Dropdown.Item onClick={() => onClickManageAdminList(isAdmin, otherUser)}>
				<div className='flex items-center font-normal text-sm text-gray-700'>
					{isAdmin ? '관리자 해제하기' : '관리자 임명하기'}
				</div>
			</Dropdown.Item>
		);
	};

	const onClickManageMutedList = (otherUser: ChatParticipant) => {
		//temp
	};

	const manageMutedList = (otherUser: ChatParticipant) => {
		return (
			<Dropdown.Item onClick={() => onClickManageMutedList(otherUser)}>
				<div className='flex items-center font-normal text-sm text-gray-700'>
					조용히 시키기
				</div>
			</Dropdown.Item>
		);
	};

	const onClickManageKickedList = (otherUser: ChatParticipant) => {
		//temp
		chat.participants.filter(
			(participant) => participant.user.id !== otherUser?.user.id
		);
	};

	const manageKickedList = (otherUser: ChatParticipant) => {
		return (
			<Dropdown.Item onClick={() => onClickManageKickedList(otherUser)}>
				<div className='flex items-center font-normal text-sm text-red-500'>
					채널에서 제거
				</div>
			</Dropdown.Item>
		);
	};

	const onClickManageBannedList = (otherUser: ChatParticipant) => {
		//temp
		chat.participants.filter(
			(participant) => participant.user.id !== otherUser?.user.id
		);
	};

	const manageBannedList = (otherUser: ChatParticipant) => {
		return (
			<Dropdown.Item onClick={() => onClickManageBannedList(otherUser)}>
				<div className='flex items-center font-normal text-sm text-red-5000'>
					채널에서 추방
				</div>
			</Dropdown.Item>
		);
	};

	const memberDotButton = (participant: ChatParticipant) => {
		const otherUser = participant.user;
		const isFriend = friendList.some((friend) => friend.id === otherUser.id);
		const isBlocked = blockedList.some(
			(blockedUser) => blockedUser.id === otherUser.id
		);
		const isAdmin =
			participant.role === ChatParticipantRole.ADMIN ||
			participant.role === ChatParticipantRole.OWNER;

		switch (userRole) {
			case ChatParticipantRole.MEMBER:
				return (
					<Dropdown
						label=''
						dismissOnClick={false}
						renderTrigger={() => dotButton()}
					>
						{inviteGame(participant)}
						{manageFriend(isFriend, participant)}
						{manageBlockList(isBlocked, participant)}
					</Dropdown>
				);
			case ChatParticipantRole.ADMIN:
				return (
					<Dropdown
						label=''
						dismissOnClick={false}
						renderTrigger={() => dotButton()}
					>
						{inviteGame(participant)}
						{manageFriend(isFriend, participant)}
						{manageBlockList(isBlocked, participant)}
						<Dropdown.Divider />
						{manageMutedList(participant)}
						{manageKickedList(participant)}
						{manageBannedList(participant)}
					</Dropdown>
				);
			case ChatParticipantRole.OWNER:
				return (
					<Dropdown
						label=''
						dismissOnClick={false}
						renderTrigger={() => dotButton()}
					>
						{inviteGame(participant)}
						{manageFriend(isFriend, participant)}
						{manageBlockList(isBlocked, participant)}
						<Dropdown.Divider />
						{manageAdminList(isAdmin, participant)}
						{manageMutedList(participant)}
						{manageKickedList(participant)}
						{manageBannedList(participant)}
					</Dropdown>
				);
		}
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

	const participantsList = () => {
		const participants = searchedParticipant;

		if (participants.length === 0) {
			return (
				<>
					<div className='pl-5 pt-2 text-xs font-semibold text-gray-600'>
						이 채널에서
					</div>
					<NoResult />
				</>
			);
		}
		return participants.map((participant, id) => (
			<div
				className='px-4 py-3 flex items-center justify-between w-full hover:bg-gray-200'
				key={id}
			>
				<div className='flex items-center'>
					<MemberItem user={participant.user} />
					<div className='ml-2'>{roleBadge(participant.role)}</div>
				</div>
				{memberDotButton(participant)}
			</div>
		));
	};

	return (
		<div className='flex flex-col w-full chat-right-sidebar-tap'>
			{searchInput()}
			<div className='overflow-y-auto'>
				{addParticipant()}
				{participantsList()}
			</div>
		</div>
	);
};

export default ChatMemberInquireTap;
