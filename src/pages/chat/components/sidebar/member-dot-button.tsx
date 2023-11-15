import {
	addBlockedFriend,
	deleteBlockedFriend,
	deleteFriend,
	getBlockedList,
	getFriendList,
	getFriendRelation,
	updateFriend,
} from 'api/friend-api';
import { Dropdown } from 'flowbite-react';
import useChatAlert from 'hooks/use-chat-alert';
import { chatSocket } from 'pages/chat/chat-socket';
import { useEffect, useState } from 'react';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { ChatParticipantRole } from 'ts/enums/chat-participants-role.enum';
import { ChatParticipantStatus } from 'ts/enums/chat-participants-status.enum';
import { ProfileStatus } from 'ts/enums/profile/profile-status.enum';
import { ChatParticipant } from 'ts/interfaces/chat-participant.model';
import { ChatRoom } from 'ts/interfaces/chat-room.model';
import User from 'ts/interfaces/user.model';
import { chatAlertModalState } from 'ts/states/chat-alert-modal';
import { chatState } from 'ts/states/chat-state';
import { gameModalState } from 'ts/states/game/game-wait-state';
import { opponentInfoState } from 'ts/states/game/opponent-info-state';
import { userState } from 'ts/states/user-state';
import { userFriendsState } from 'ts/states/user/user-friends-state';

const MemberDotButton = (props: { participant: ChatParticipant }) => {
	const user = useRecoilValue(userState) as User;
	const setAlertModal = useSetRecoilState(chatAlertModalState);
	const setDefaultAlertModal = useChatAlert();
	const [gameModal, setGameModal] = useRecoilState(gameModalState);
	const setOpponentUserInfo = useSetRecoilState(opponentInfoState);
	const [userRole, setUserRole] = useState<ChatParticipantRole>(
		ChatParticipantRole.MEMBER
	);
	const [relation, setRelation] = useState<ProfileStatus>(
		ProfileStatus.UNDEFINED
	);
	const setFriendsState = useSetRecoilState(userFriendsState);
	const chat = useRecoilValue(chatState).chatRoom as ChatRoom;

	const { participant } = props;
	const otherUser = participant.user;
	const isBlocked = relation === ProfileStatus.BLOCKED_BY_ME;
	const isAdmin =
		participant.role === ChatParticipantRole.ADMIN ||
		participant.role === ChatParticipantRole.OWNER;

	useEffect(() => {
		(async () => {
			const relation = await getFriendRelation(otherUser.id);
			setRelation(relation);
		})();
	}, []);

	useEffect(() => {
		const participant = chat.participants.find(
			(participant) => participant.user.id === user.id
		);
		if (participant) {
			setUserRole(participant.role);
		}
	}, []);

	const dotButton = () => {
		return (
			<div>
				<button className='rounded-lg p-2 text-gray-900 bg-white border border-gray-300 enabled:hover:bg-gray-100 focus:ring-4 focus:ring-cyan-300 '>
					<BiDotsVerticalRounded size={12} />
				</button>
			</div>
		);
	};

	const onClickInviteGame = (otherUser: ChatParticipant) => {
		setOpponentUserInfo(otherUser.user);
		setGameModal({ ...gameModal, show: true, invite: true });
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

	const manageFriend = async (
		isFriend: boolean,
		otherUser: ChatParticipant
	) => {
		if (isFriend) {
			await deleteFriend(otherUser.user.id);
			const friends = await getFriendList(user!.id);
			setFriendsState((pre) => ({ ...pre, friends }));
			setAlertModal((pre) => ({ ...pre, status: false }));
			return;
		}
		await updateFriend(otherUser.user.id);
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

	const manageFriendList = (
		relation: ProfileStatus,
		otherUser: ChatParticipant
	) => {
		const isFriend = relation === ProfileStatus.FRIEND;
		const isPending =
			relation === ProfileStatus.REQUESTED_BY_ME ||
			relation === ProfileStatus.REQUESTED_BY_OTHER;
		const text = (() => {
			switch (relation) {
				case ProfileStatus.FRIEND:
					return '친구 제거하기';
				case ProfileStatus.REQUESTED_BY_ME:
					return '수락 대기 중';
				case ProfileStatus.REQUESTED_BY_OTHER:
					return '?';
				default:
					return '친구 신청하기';
			}
		})();

		return (
			<Dropdown.Item
				onClick={() => onClickManageFriend(isFriend, otherUser)}
				disabled={isPending}
			>
				<div className='flex items-center font-normal text-sm text-gray-700'>
					{text}
				</div>
			</Dropdown.Item>
		);
	};

	const onClickManageBlockList = async (
		isBlocked: boolean,
		otherUser: ChatParticipant
	) => {
		if (isBlocked) {
			await deleteBlockedFriend(otherUser.user.id);
			const friends = await getFriendList(user!.id);
			const blockedFriends = await getBlockedList(user!.id);
			setFriendsState((pre) => ({ ...pre, friends, blockedFriends }));
			return;
		}
		await addBlockedFriend(otherUser.user.id);
		const friends = await getFriendList(user!.id);
		const blockedFriends = await getBlockedList(user!.id);
		setFriendsState((pre) => ({ ...pre, friends, blockedFriends }));
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
			(status: number) => {
				if (status !== 200) {
					setDefaultAlertModal();
				}
			}
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

	switch (userRole) {
		case ChatParticipantRole.MEMBER:
			return (
				<Dropdown
					label=''
					dismissOnClick={false}
					renderTrigger={() => dotButton()}
				>
					{inviteGame(participant)}
					{manageFriendList(relation, participant)}
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
					{manageFriendList(relation, participant)}
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
					{manageFriendList(relation, participant)}
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

export default MemberDotButton;
