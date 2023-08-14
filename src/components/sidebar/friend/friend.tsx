import FriendList from "./friend-list";
import FriendMenu from "./friend-menu";
import FriendRequested from "./friend-requested";

const Friend = (): JSX.Element => {
	// 친구 신청있는 지 알아오기
	const newFriendRequested = 10;

	return (
		<div className="flex flex-col h-full justify-between">
			<div>
				{newFriendRequested ? null : <FriendRequested />}
				<FriendList />
			</div>
			<FriendMenu />
		</div>
	);
}

export default Friend