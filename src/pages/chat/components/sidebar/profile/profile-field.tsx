import useChangeChat from 'hooks/use-change-chat';
import useChatAlert from 'hooks/use-chat-alert';
import { chatSocket } from 'socket/chat-socket';
import IconButton from 'pages/chat/components/sidebar/profile/icon-button';
import ProfileDotButton from 'pages/chat/components/sidebar/profile/profile-dot-button';
import Status from 'pages/chat/components/status';
import { MdOutlineRocketLaunch } from 'react-icons/md';
import { RiMessage2Line } from 'react-icons/ri';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { UserStatus } from 'ts/enums/user/user-status.enum';
import { Dm } from 'ts/interfaces/dm.model';
import User from 'ts/interfaces/user.model';
import { chatListSelector, chatListState } from 'ts/states/chat-list.state';
import { chatSidebarState } from 'ts/states/chat-sidebar-state';
import { gameModeSelectState } from 'ts/states/game/game-mode-select-state';
import { opponentInfoState } from 'ts/states/game/opponent-info-state';
import { userState } from 'ts/states/user-state';

const ProfileField = () => {
	const user = useRecoilValue(userState) as User;
	const otherUser = useRecoilValue(chatSidebarState).profile as User;
	const dmList = useRecoilValue(chatListSelector).dmList;
	const setChat = useChangeChat();
	const setDmList = useSetRecoilState(chatListState);
	const setAlertModal = useChatAlert();
	const setGameModeSelect = useSetRecoilState(gameModeSelectState);
	const setOpponentUserInfo = useSetRecoilState(opponentInfoState);

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

	return (
		<div className='my-4 border-b'>
			<div className='mx-4'>
				<div className='font-bold text-xl'>{otherUser.nickname}</div>
				<div className='flex items-center m-2'>
					<Status status={otherUser.status} />
					<div className='ml-2'>{statusInKorean()}</div>
				</div>
				<div className='flex'>
					<IconButton
						icon={<RiMessage2Line size='12' />}
						label='메시지'
						onClickEvent={onClickFriend}
						disabled={otherUser.id === user.id}
					/>
					<IconButton
						icon={<MdOutlineRocketLaunch size='12' />}
						label='게임 신청'
						onClickEvent={onClickGame}
						disabled={(otherUser.id === user.id) || !(otherUser.status === UserStatus.ONLINE)}
					/>
					<ProfileDotButton />
				</div>
			</div>
		</div>
	);
};

export default ProfileField;
