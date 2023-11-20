import {
	acceptFriendRequest,
	addBlockedFriend,
	deleteBlockedFriend,
	deleteFriend,
	denyFriendRequest,
	getFriendList,
	getFriendRelation,
	updateFriend,
} from 'api/friend-api';
import { Dropdown } from 'flowbite-react';
import useChatAlert from 'hooks/use-chat-alert';
import { chatSocket } from 'socket/chat-socket';
import { useEffect, useState } from 'react';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ChatParticipantRole } from 'ts/enums/chat-participants-role.enum';
import { ChatParticipantStatus } from 'ts/enums/chat-participants-status.enum';
import { ProfileStatus } from 'ts/enums/profile/profile-status.enum';
import { ChatParticipant } from 'ts/interfaces/chat-participant.model';
import { ChatRoom } from 'ts/interfaces/chat-room.model';
import User from 'ts/interfaces/user.model';
import { chatAlertModalState } from 'ts/states/chat-alert-modal';
import { chatState } from 'ts/states/chat-state';
import { gameModeSelectState } from 'ts/states/game/game-mode-select-state';
import { opponentInfoState } from 'ts/states/game/opponent-info-state';
import { userState } from 'ts/states/user-state';
import { userFriendsState } from 'ts/states/user/user-friends-state';

const MemberDotButton = (props: { participant: ChatParticipant }) => {
	const user = useRecoilValue(userState) as User;
	const setAlertModal = useSetRecoilState(chatAlertModalState);
	const setDefaultAlertModal = useChatAlert();
	const setGameModeSelect = useSetRecoilState(gameModeSelectState);
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
	const isBlocked = relation === ProfileStatus.BLOCKEDBYME;
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

	const onClickInviteGame = () => {
		setOpponentUserInfo(otherUser);
		setGameModeSelect(true);
	};

	const inviteGame = () => {
		return (
			<Dropdown.Item onClick={() => onClickInviteGame()}>
				<div className='flex items-center font-normal text-sm text-gray-700'>
					게임 초대하기
				</div>
			</Dropdown.Item>
		);
	};

	const manageFriend = async () => {
		switch (relation) {
			case ProfileStatus.FRIEND:
				await deleteFriend(otherUser.id);
				const friendsAfterDelete = await getFriendList(user!.id);
				setFriendsState((pre) => ({ ...pre, friendsAfterDelete }));
				setAlertModal((pre) => ({ ...pre, status: false }));
				break;
			case ProfileStatus.REQUESTEDBYME:
				await denyFriendRequest(otherUser.id);
				break;
			case ProfileStatus.REQUESTEDBYOTHER:
				await acceptFriendRequest(otherUser.id);
				break;
			default:
				await updateFriend(otherUser.id);
				const friendsAfterUpdate = await getFriendList(user!.id);
				setFriendsState((pre) => ({ ...pre, friendsAfterUpdate }));
		}
		const newRelation = await getFriendRelation(otherUser.id);
		setRelation(newRelation);
	};

	const onClickManageFriend = (isFriend: boolean) => {
		if (isFriend) {
			setAlertModal({
				status: true,
				title: `친구 목록에서 ${otherUser.nickname} 님을 제거하시겠습니까?`,
				subText: '이 사용자는 더 이상 친구 목록에 존재하지 않습니다.',
				confirmButtonText: `친구 목록에서 제거`,
				exitButtonText: '취소',
				onClickButton: () => {
					manageFriend();
				},
			});
			return;
		}
		manageFriend();
	};

	const manageFriendList = () => {
		const isFriend = relation === ProfileStatus.FRIEND;

		const text = (() => {
			switch (relation) {
				case ProfileStatus.FRIEND:
					return '친구 제거하기';
				case ProfileStatus.REQUESTEDBYME:
					return '요청됨';
				case ProfileStatus.REQUESTEDBYOTHER:
					return '요청 수락';
				default:
					return '친구 신청하기';
			}
		})();

		return (
			<Dropdown.Item onClick={() => onClickManageFriend(isFriend)}>
				<div className='flex items-center font-normal text-sm text-gray-700'>
					{text}
				</div>
			</Dropdown.Item>
		);
	};

	const onClickManageBlockList = async () => {
		if (isBlocked) {
			await deleteBlockedFriend(otherUser.id);
		} else {
			await addBlockedFriend(otherUser.id);
		}
		const newRelation = await getFriendRelation(otherUser.id);
		setRelation(newRelation);
	};

	const manageBlockList = () => {
		return (
			<Dropdown.Item onClick={onClickManageBlockList}>
				<div className='flex items-center font-normal text-sm text-red-500'>
					{isBlocked ? '사용자 차단 해제하기' : '사용자 차단하기'}
				</div>
			</Dropdown.Item>
		);
	};

	const manageAdmin = () => {
		chatSocket.emit(
			'manageParticipantRole',
			{
				roomId: chat.id,
				user: otherUser,
				role: isAdmin ? ChatParticipantRole.MEMBER : ChatParticipantRole.ADMIN,
			},
			(status: number) => {
				if (status === 200) {
					setAlertModal((pre) => ({ ...pre, status: false }));
				}
			}
		);
	};

	const onClickManageAdminList = (isAdmin: boolean) => {
		if (isAdmin) {
			setAlertModal({
				status: true,
				title: `${chat.roomName} 채널 관리자 목록에서 ${otherUser.nickname} 님을 제거하시겠습니까?`,
				subText: '이 사용자는 더 이상 채널을 관리할 수 없습니다.',
				confirmButtonText: `채널 관리자 목록에서 제거`,
				exitButtonText: '취소',
				onClickButton: manageAdmin,
			});
			return;
		}
		manageAdmin();
	};

	const manageAdminList = () => {
		return (
			<Dropdown.Item onClick={() => onClickManageAdminList(isAdmin)}>
				<div className='flex items-center font-normal text-sm text-gray-700'>
					{isAdmin ? '관리자 해제하기' : '관리자 임명하기'}
				</div>
			</Dropdown.Item>
		);
	};

	const onClickManageMemberStatus = (status: ChatParticipantStatus) => {
		chatSocket.emit(
			'manageParticipantStatus',
			{
				roomId: chat.id,
				user: otherUser,
				status,
			},
			(status: number) => {
				if (status !== 200) {
					setDefaultAlertModal();
				}
			}
		);
	};

	const manageMutedList = () => {
		if (participant.role === ChatParticipantRole.OWNER) {
			return null;
		}
		return (
			<Dropdown.Item
				onClick={() => onClickManageMemberStatus(ChatParticipantStatus.MUTED)}
			>
				<div className='flex items-center font-normal text-sm text-gray-700'>
					조용히 시키기
				</div>
			</Dropdown.Item>
		);
	};

	const manageKickedList = () => {
		if (participant.role === ChatParticipantRole.OWNER) {
			return null;
		}
		return (
			<Dropdown.Item
				onClick={() => onClickManageMemberStatus(ChatParticipantStatus.KICKED)}
			>
				<div className='flex items-center font-normal text-sm text-red-500'>
					채널에서 제거
				</div>
			</Dropdown.Item>
		);
	};

	const manageBannedList = () => {
		if (participant.role === ChatParticipantRole.OWNER) {
			return null;
		}
		return (
			<Dropdown.Item
				onClick={() => onClickManageMemberStatus(ChatParticipantStatus.BANNED)}
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
					{inviteGame()}
					{manageFriendList()}
					{manageBlockList()}
				</Dropdown>
			);
		case ChatParticipantRole.ADMIN:
			return (
				<Dropdown
					label=''
					dismissOnClick={false}
					renderTrigger={() => dotButton()}
				>
					{inviteGame()}
					{manageFriendList()}
					{manageBlockList()}
					{participant.role !== ChatParticipantRole.OWNER && (
						<Dropdown.Divider />
					)}
					{manageMutedList()}
					{manageKickedList()}
					{manageBannedList()}
				</Dropdown>
			);
		case ChatParticipantRole.OWNER:
			return (
				<Dropdown
					label=''
					dismissOnClick={false}
					renderTrigger={() => dotButton()}
				>
					{inviteGame()}
					{manageFriendList()}
					{manageBlockList()}
					<Dropdown.Divider />
					{manageAdminList()}
					{manageMutedList()}
					{manageKickedList()}
					{manageBannedList()}
				</Dropdown>
			);
	}
};

export default MemberDotButton;
