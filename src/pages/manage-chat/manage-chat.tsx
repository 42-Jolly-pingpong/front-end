import GetRoomInfo from 'components/services/getRoomInfo';
import GetUserInfo from 'components/services/getUserInfo';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

// back-end API : 방에서의 내 권한 확인
const getRoomAuth = () => {
	return;
};

// back-end API : check room access
// back-end API : 해당 URL 접근 권한이 있는지.(status 확인. 접근 권한이 없습니다.)

// back-end API : 비밀번호를 입력해야 하진 않는지. (만약 그렇다면, 잘못된 접근입니다. 띄우기.)

// back-end API : 삭제여부. (만약 그렇다면, 삭제된 방입니다.)

// back-end API: user_idx, room_idx중 NaN이 있는 경우

const ManageChat = () => {
	const params = useParams();
	const user_idx = parseInt(params.user_idx ?? '', 10);
	const room_idx = parseInt(params.room_idx ?? '', 10);

	//const room_idx = parseInt(params?.room_idx, 10) || -1;

	const [user, setUser] = useState(GetUserInfo(user_idx)); // 이후 변경
	const [room, setRoom] = useState(GetRoomInfo(0)); // 이후 변경
	//const myRoomAuth = getRoomAuth(user?.idx, room?.idx);

	return <div>들어오죠?</div>;
};

export default ManageChat;
