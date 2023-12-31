import { useSetRecoilState } from 'recoil';
import { Dropdown } from 'flowbite-react';
import { HiEllipsisVertical } from 'react-icons/hi2';
import User from 'ts/interfaces/user.model';
import { friendSidebarModalState } from 'ts/states/friend/friend-sidebar-modal-state';
import { opponentInfoState } from 'ts/states/game/opponent-info-state';
import { FriendSidebarModalStatus } from 'ts/enums/friend/friend-sidebar-modal-status.enum';
import { gameModeSelectState } from 'ts/states/game/game-mode-select-state';
import { getDM } from 'api/chat-api';
import useChangeChat from 'hooks/use-change-chat';
import { useNavigate } from 'react-router-dom';
import { UserStatus } from 'ts/enums/user/user-status.enum';

interface FriendInfoProps {
	user: User;
}

const FriendDropdown: React.FC<FriendInfoProps> = ({ user }) => {
	const setModalState = useSetRecoilState(friendSidebarModalState);
	const setGameModeSelect = useSetRecoilState(gameModeSelectState);
	const setOpponentUserInfo = useSetRecoilState(opponentInfoState);
	const setChat = useChangeChat();
	const navigate = useNavigate();

	const handleUnfriend = async () => {
		setModalState({ type: FriendSidebarModalStatus.UNFRIEND, friend: user });
	};

	const handleBanned = async () => {
		setModalState({ type: FriendSidebarModalStatus.BANNED, friend: user });
	};

	const handleInviteGame = () => {
		setOpponentUserInfo(user);
		setGameModeSelect(true);
	};

	const handleMessage = async () => {
		const dm = await getDM(user!);
		setChat(dm!);
		navigate('/chat');
	};

	return (
		<div>
			<Dropdown
				arrowIcon={false}
				inline
				label={
					<HiEllipsisVertical
						className='hidden group-hover:block group-hover:bg-white rounded'
						size='28'
					/>
				}
				size='md'
			>
				<Dropdown.Item className='text-gray-700' onClick={handleMessage}>
					메시지 보내기
				</Dropdown.Item>
				<Dropdown.Item className='text-gray-700' onClick={handleInviteGame} disabled={!(user.status == UserStatus.ONLINE)}>
					게임 초대하기
				</Dropdown.Item>
				<Dropdown.Item className='text-red-500' onClick={handleUnfriend}>
					친구 끊기
				</Dropdown.Item>
				<Dropdown.Item className='text-red-500' onClick={handleBanned}>
					차단하기
				</Dropdown.Item>
			</Dropdown>
		</div>
	);
};

export default FriendDropdown;
