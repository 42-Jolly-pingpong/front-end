import FriendList from "./friend-list";
import FriendRequested from "./friend-requested";

const Friend = (): JSX.Element => {
	// 친구 수 가져오기
	const amount = 10;

	return (
		<div>
			<div>
				List ({amount})
			</div>
			<FriendRequested />
			<FriendList />
		</div>
	);
}

export default Friend