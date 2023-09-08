import { tempChatroom1, tempUser1 } from 'components/sidebar/temp-chat-user';
import UserShortProfile from 'components/user-info/user-short-profile';
import InfoButton from 'components/user-info/info-button';
import { useNavigate } from 'react-router-dom';
import { sidebarState } from 'ts/states/sidebar-state';
import { useSetRecoilState } from 'recoil';
import { SidebarStatus } from 'ts/enums/sidebar-status.enum';
import { chatState, chatroomState } from 'ts/states/chat-state';
import { User } from 'ts/interfaces/user.model';
import { ChatStatus } from 'ts/enums/chat-status.enum';

const UserInfo = () => {
	const context = useNavigate();
	const setSidebarState = useSetRecoilState(sidebarState);
	const setCurrChatroom = useSetRecoilState(chatroomState);
	const setCurrChat = useSetRecoilState(chatState);

	const user = (() => {
		//api 닉네임 이용해 user 가져옴
		//없거나 두 개 이상이면 에러
		return tempUser1;
	})();
	const isFriend = true; //임시
	const isBlockedFriend = false; //임시

	const setChatroomByUser = (user: User) => {
		const privateChatroom = (() => {
			//api 닉네임 이용해 chatroom
			return tempChatroom1;
		})();
		setCurrChatroom(tempChatroom1);
		setCurrChat(ChatStatus.INCHAT);
	};

	const onClickProfileButton = () => {
		context(`/profile/${user.idx}`);
	};

	const onClickInviteGameButton = () => {
		//
	};

	const onClickSendChatButton = () => {
		setSidebarState(SidebarStatus.CHAT);
		setChatroomByUser(user);
		// setCurrChatroom();
		//
	};

	const onClickChangeFriendStatusButton = () => {
		//
	};

	const onClickChangeBlockStatusButton = () => {
		//
	};

	return (
		<div className='flex flex-col'>
			<UserShortProfile user={user} />
			<InfoButton label={'프로필'} onClick={onClickProfileButton} />
			<InfoButton label={'게임 초대'} onClick={onClickInviteGameButton} />
			<InfoButton label={'채팅 보내기'} onClick={onClickSendChatButton} />
			<InfoButton
				label={isFriend ? '친구 삭제' : '친구 추가'}
				onClick={onClickChangeFriendStatusButton}
			/>
			<InfoButton
				label={isBlockedFriend ? '차단 해제' : '유저 차단'}
				onClick={onClickChangeBlockStatusButton}
			/>
		</div>
	);
};

export default UserInfo;
