import { Badge, Dropdown, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { ChatParticipant } from 'ts/interfaces/chat-participant.model';
import { ChatRoom } from 'ts/interfaces/chat-room.model';
import { BiDotsVerticalRounded, BiSearch } from 'react-icons/bi';
import { FiUserPlus } from 'react-icons/fi';
import userData from 'ts/mock/user-data';
import { ChatParticipantRole } from 'ts/enums/chat-participants-role.enum';
import MemberItem from 'pages/chat/components/sidebar/member-item';
import NoResult from 'pages/chat/components/sidebar/no-result';
import useFetch from 'hooks/use-fetch';
import { ChatParticipantStatus } from 'ts/enums/chat-participants-status.enum';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { chatState } from 'ts/states/chat-state';
import { chatSocket } from 'pages/chat/chat-socket';
import User from 'ts/interfaces/user.model';
import { chatAlertModalState } from 'ts/states/chat-alert-modal';

const ChatMemberInquireTap = (props: {
	setIsInquireTap: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const chat = useRecoilValue(chatState).chatRoom as ChatRoom;
	const [input, setInput] = useState<string>('');
	const [friendList, setFriendList] = useState<User[]>([]);
	const [blockedList, setBlockedList] = useState<User[]>([]);
	const [userRole, setUserRole] = useState<ChatParticipantRole>(
		ChatParticipantRole.MEMBER
	);
	const [stableParticipants, setStableParticipants] = useState<
		ChatParticipant[]
	>([]);
	const [searchedParticipant, setSearchedParticipant] = useState<
		ChatParticipant[]
	>([]);
	const getData = useFetch();
	const setAlertModal = useSetRecoilState(chatAlertModalState);

	const user = userData[0]; //temp

	useEffect(() => {
		setStableParticipants(
			chat.participants
				.filter(
					(participant) =>
						participant.status === ChatParticipantStatus.DEFAULT ||
						participant.status === ChatParticipantStatus.MUTED
				)
				.sort((a, b) => a.user.nickname.localeCompare(b.user.nickname))
		);
	}, [chat]);

	useEffect(() => {
		if (input.length === 0) {
			setSearchedParticipant(stableParticipants);
		} else {
			setSearchedParticipant(
				stableParticipants.filter((participant) =>
					participant.user.nickname.includes(input)
				)
			);
		}
	}, [input, stableParticipants, chat]);

	useEffect(() => {
		(async () => {
			await getData('get', '/friends')
				.then((res) => {
					if (res.ok) {
						return res.json();
					}
					throw Error(res.statusText);
				})
				.then((data) => setFriendList(data))
				.catch((err) => console.log('get Friend list', err));
		})();
		(async () => {
			await getData('get', '/friends/black-list')
				.then((res) => {
					if (res.ok) {
						return res.json();
					}
					throw Error(res.statusText);
				})
				.then((data) => setBlockedList(data))
				.catch((err) => console.log('get blocked list', err));
		})();
		const participant = chat.participants.find(
			(participant) => participant.user.id === user.id
		);
		if (participant) {
			setUserRole(participant.role);
		}
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

	const manageFriend = (isFriend: boolean, otherUser: ChatParticipant) => {
		//temp
	};

	const onClickManageFriend = (
		isFriend: boolean,
		otherUser: ChatParticipant
	) => {
		if (isFriend) {
			setAlertModal({
				status: true,
				title: `친구 목록에서 ${otherUser.user.nickname} 님을 제거하시겠습니까?`,
				subText: '이 사용자는 더 이상 친구 목록에 존재하지 않습니다.',
				confirmButtonText: `친구 목록에서 제거`,
				exitButtonText: '취소',
				onClickButton: () => {
					manageFriend(isFriend, otherUser);
				},
			});
			return;
		}
		manageFriend(isFriend, otherUser);
	};

	const manageFriendList = (isFriend: boolean, otherUser: ChatParticipant) => {
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

	const manageAdmin = (isAdmin: boolean, otherUser: ChatParticipant) => {
		chatSocket.emit(
			'manageParticipantRole',
			{
				roomId: chat.id,
				user: otherUser.user,
				role: isAdmin ? ChatParticipantRole.MEMBER : ChatParticipantRole.ADMIN,
			},
			(status: number) => {
				if (status === 200) {
					setAlertModal((pre) => ({ ...pre, status: false }));
				}
			}
		);
	};

	const onClickManageAdminList = (
		isAdmin: boolean,
		otherUser: ChatParticipant
	) => {
		if (isAdmin) {
			setAlertModal({
				status: true,
				title: `${chat.roomName} 채널 관리자 목록에서 ${otherUser.user.nickname} 님을 제거하시겠습니까?`,
				subText: '이 사용자는 더 이상 채널을 관리할 수 없습니다.',
				confirmButtonText: `채널 관리자 목록에서 제거`,
				exitButtonText: '취소',
				onClickButton: () => {
					manageAdmin(isAdmin, otherUser);
				},
			});
			return;
		}
		manageAdmin(isAdmin, otherUser);
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

	const onClickManageMemberStatus = (
		otherUser: ChatParticipant,
		status: ChatParticipantStatus
	) => {
		chatSocket.emit(
			'manageParticipantStatus',
			{
				roomId: chat.id,
				user: otherUser.user,
				status,
			},
			(status: number) => {}
		);
	};

	const manageMutedList = (otherUser: ChatParticipant) => {
		if (otherUser.role === ChatParticipantRole.OWNER) {
			return null;
		}
		return (
			<Dropdown.Item
				onClick={() =>
					onClickManageMemberStatus(otherUser, ChatParticipantStatus.MUTED)
				}
			>
				<div className='flex items-center font-normal text-sm text-gray-700'>
					조용히 시키기
				</div>
			</Dropdown.Item>
		);
	};

	const manageKickedList = (otherUser: ChatParticipant) => {
		if (otherUser.role === ChatParticipantRole.OWNER) {
			return null;
		}
		return (
			<Dropdown.Item
				onClick={() =>
					onClickManageMemberStatus(otherUser, ChatParticipantStatus.KICKED)
				}
			>
				<div className='flex items-center font-normal text-sm text-red-500'>
					채널에서 제거
				</div>
			</Dropdown.Item>
		);
	};

	const manageBannedList = (otherUser: ChatParticipant) => {
		if (otherUser.role === ChatParticipantRole.OWNER) {
			return null;
		}
		return (
			<Dropdown.Item
				onClick={() =>
					onClickManageMemberStatus(otherUser, ChatParticipantStatus.BANNED)
				}
			>
				<div className='flex items-center font-normal text-sm text-red-500'>
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
						{manageFriendList(isFriend, participant)}
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
						{manageFriendList(isFriend, participant)}
						{manageBlockList(isBlocked, participant)}
						{participant.role !== ChatParticipantRole.OWNER && (
							<Dropdown.Divider />
						)}
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
						{manageFriendList(isFriend, participant)}
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
					<MemberItem
						user={participant.user}
						isMe={participant.user.id === user.id}
					/>
					<div className='ml-2'>{roleBadge(participant.role)}</div>
				</div>
				{participant.user.id !== user.id && memberDotButton(participant)}
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
