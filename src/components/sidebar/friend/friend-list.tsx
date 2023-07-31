import FriendElement from "./friend-element";

const FriendList = () => {
	//친구 목록 가져오기
	return (
		<div>
			<FriendElement src={"https://img.freepik.com/free-photo/adorable-kitty-looking-like-it-want-to-hunt_23-2149167099.jpg?w=2000"} title={"test1"} request={false}/>
			<FriendElement src={"https://img.freepik.com/free-photo/adorable-kitty-looking-like-it-want-to-hunt_23-2149167099.jpg?w=2000"} title={"test2"} request={false}/>
			<FriendElement src={"https://img.freepik.com/free-photo/adorable-kitty-looking-like-it-want-to-hunt_23-2149167099.jpg?w=2000"} title={"test3"} request={false}/>
		</div>
	);
}

export default FriendList