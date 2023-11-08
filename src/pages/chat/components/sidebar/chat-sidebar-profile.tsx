import { Button, Dropdown } from 'flowbite-react';
import ChatSidebarHeader from 'pages/chat/components/sidebar/chat-sidebar-header';
import UserImg from 'pages/chat/components/user-img';
import { RiMessage2Line } from 'react-icons/ri';
import { MdOutlineRocketLaunch } from 'react-icons/md';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { HiOutlineUserAdd, HiOutlineUserRemove } from 'react-icons/hi';
import { BsMailbox } from 'react-icons/bs';
import { chatSidebarState } from 'ts/states/chat-sidebar-state';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import HistoryDoughnutChart from 'pages/chat/components/sidebar/history-doughnut-chart';
import { Dm } from 'ts/interfaces/dm.model';
import useChangeChat from 'hooks/use-change-chat';
import { chatListSelector, chatListState } from 'ts/states/chat-list.state';
import { chatSocket } from 'pages/chat/chat-socket';
import useChatAlert from 'hooks/use-chat-alert';
import { userState } from 'ts/states/user-state';
import User from 'ts/interfaces/user.model';
import Status from 'pages/chat/components/status';
import { UserStatus } from 'ts/enums/user/user-status.enum';
import { gameModeSelectState } from 'ts/states/game/game-mode-select-state';
import { opponentInfoState } from 'ts/states/game/opponent-info-state';
import { userFriendsState } from 'ts/states/user/user-friends-state';
import {
	addBlockedFriend,
	deleteBlockedFriend,
	deleteFriend,
	getBlockedList,
	getFriendList,
	updateFriend,
} from 'api/friend-api';

const ChatSidebarProfile = () => {
	const otherUser = useRecoilValue(chatSidebarState).profile;
	const dmList = useRecoilValue(chatListSelector).dmList;
	const setChat = useChangeChat();
	const setDmList = useSetRecoilState(chatListState);
	const setAlertModal = useChatAlert();
	const user = useRecoilValue(userState) as User;
	const setGameModeSelect = useSetRecoilState(gameModeSelectState);
	const setOpponentUserInfo = useSetRecoilState(opponentInfoState);
	const [relation, setFriendsState] = useRecoilState(userFriendsState);

	if (otherUser === null) {
		return null;
	}

	const isFriend = (relation.friends as User[]).find(
		(user) => user.id === otherUser.id
	);

	const isBlocked = (relation.blockedFriends as User[]).find(
		(user) => user.id === otherUser.id
	);

	const statusInKorean = () => {
		switch (otherUser.status) {
			case UserStatus.INGAME:
				return '게임 중';
			case UserStatus.OFFLINE:
				return '오프라인';
			case UserStatus.ONLINE:
				return '온라인';
		}
	};

	const button = (
		icon: JSX.Element,
		label: string,
		onClickEvent: React.MouseEventHandler<HTMLButtonElement>
	) => {
		return (
			<div className='mr-2.5 mb-4'>
				<Button
					color='light'
					size='sm'
					onClick={onClickEvent}
					disabled={user.id === otherUser.id}
				>
					<div className='flex items-center font-normal text-gray-600'>
						{icon}
						<div className='ml-2 text-xs font-medium'>{label}</div>
					</div>
				</Button>
			</div>
		);
	};

	const renderTrigger = () => {
		return (
			<div>
				<button
					disabled={user.id === otherUser.id}
					className='disabled:cursor-not-allowed disabled:opacity-50 rounded-lg flex items-stretch items-center justify-center p-2 text-center text-gray-900 bg-white border border-gray-300 enabled:hover:bg-gray-100 focus:ring-4 focus:ring-cyan-300 '
				>
					<BiDotsVerticalRounded size={16} />
				</button>
			</div>
		);
	};

	const onClickManageFriend = async () => {
		if (isFriend) {
			await deleteFriend(otherUser.id);
			const friends = await getFriendList(user!.id);
			setFriendsState((pre) => ({ ...pre, friends }));
			return;
		}
		await updateFriend(otherUser.id);
	};

	const onClickManageBlock = async () => {
		if (isBlocked) {
			await deleteBlockedFriend(otherUser.id);
			const friends = await getFriendList(user!.id);
			const blockedFriends = await getBlockedList(user!.id);
			setFriendsState((pre) => ({ ...pre, friends, blockedFriends }));
			return;
		}
		await addBlockedFriend(otherUser.id);
		const friends = await getFriendList(user!.id);
		const blockedFriends = await getBlockedList(user!.id);
		setFriendsState((pre) => ({ ...pre, friends, blockedFriends }));
	};

	const dotsButton = () => {
		return (
			<Dropdown
				label=''
				dismissOnClick={false}
				renderTrigger={() => renderTrigger()}
			>
				<Dropdown.Item onClick={onClickManageFriend}>
					<div className='flex items-center font-normal text-sm text-gray-700'>
						<HiOutlineUserAdd className='mr-2' />
						{isFriend ? '친구 해제' : '친구 신청'}
					</div>
				</Dropdown.Item>
				<Dropdown.Item onClick={onClickManageBlock}>
					<div className='flex items-center font-normal text-sm text-red-500'>
						<HiOutlineUserRemove className='mr-2' />
						{isBlocked ? '차단 해제' : '차단하기'}
					</div>
				</Dropdown.Item>
			</Dropdown>
		);
	};

	const createNewDm = () => {
		chatSocket.emit(
			'createNewDm',
			{ chatMate: otherUser },
			(response: { status: number; dm: Dm }) => {
				if (response.status === 200) {
					setDmList((pre) => ({
						...pre,
						dmList: [...pre.dmList, response.dm],
					}));
					setChat(response.dm);
					return;
				}
				setAlertModal();
			}
		);
	};

	const onClickFriend = () => {
		const dm = dmList.find((dm) => dm.chatMate.id === otherUser.id);
		if (dm) {
			setChat(dm);
			return;
		}
		createNewDm();
	};

	const onClickGame = () => {
		setOpponentUserInfo(otherUser);
		setGameModeSelect(true);
	};

	const profileField = () => {
		return (
			<div className='my-4 border-b'>
				<div className='mx-4'>
					<div className='font-bold text-xl'>{otherUser.nickname}</div>
					<div className='flex items-center m-2'>
						<Status status={otherUser.status} />
						<div className='ml-2'>{statusInKorean()}</div>
					</div>
					<div className='flex'>
						{button(<RiMessage2Line size='12' />, '메시지', onClickFriend)}
						{button(
							<MdOutlineRocketLaunch size='12' />,
							'게임 신청',
							onClickGame
						)}
						{dotsButton()}
					</div>
				</div>
			</div>
		);
	};

	const contactField = () => {
		return (
			<div className='my-4 border-b'>
				<div className='mx-4'>
					<div className='font-bold text-sm'>연락처 정보</div>
					<div className='flex items-center my-4'>
						<div className='flex items-center justify-center rounded-lg w-8 h-8 bg-gray-100 mr-2'>
							<BsMailbox color='#888' size='20' />
						</div>
						<div>
							<div className='text-gray-500 font-bold text-xs'>이메일 주소</div>
							<div className='text-blue-400 font-normal text-xs'>
								{otherUser.email}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	};

	const historyField = () => {
		return (
			<div className='my-4'>
				<div className='mx-4'>
					<div className='font-bold text-sm'>전적 정보</div>
					<HistoryDoughnutChart
						winCount={otherUser.winCount}
						loseCount={otherUser.loseCount}
					/>
				</div>
			</div>
		);
	};

	return (
		<div className='h-hull w-full'>
			<ChatSidebarHeader title='프로필' />
			<div className='grow'>
				<div className='flex justify-center my-3'>
					<UserImg src={otherUser.avatarPath} size='64' />
				</div>
				{profileField()}
				{contactField()}
				{historyField()}
			</div>
		</div>
	);
};

export default ChatSidebarProfile;
