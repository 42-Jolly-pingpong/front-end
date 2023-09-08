import { tempUser1 } from 'components/sidebar/temp-chat-user';
import UserShortProfile from './user-short-profile';
import InfoButton from './info-button';
import { useNavigate } from 'react-router-dom';

const UserInfo = () => {
	const context = useNavigate();
	const user = tempUser1; //임시
	const isFriend: boolean = true; //임시
	const isBlockedFriend: boolean = false; //임시

	context('/create-chat');
	const onClickProfileButton = () => {
		context(`/profile/${user.idx}`);
	};

	const onClickInviteGameButton = () => {};

	const onClickSendChatButton = () => {};

	const onClickChangeFriendStatusButton = () => {};

	const onClickChangeBlockStatusButton = () => {};

	return (
		<div>
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
