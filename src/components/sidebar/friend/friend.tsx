import FriendList from "./friend-list";
import FriendRequested from "./friend-requested";

const Friend = (): JSX.Element => {
	// 친구 신청있는 지 알아오기
	const newFriendRequested = 10;

	return (
		<div>
			{newFriendRequested ? null : <FriendRequested />}
			<FriendList />
		</div>
	);
}

export default Friend