import { useState } from "react";
import FriendElement from "./friend-element";

const FriendList = () => {
	//친구 목록 가져오기
	const [isChecked, setIsChecked] = useState(true);

	const onClickCheckbox = () => {
		setIsChecked((prev) => prev? false : true)
	}

	return (
		<div className="collapse collapse-arrow">
			<input type="checkbox" checked={isChecked} onClick={onClickCheckbox}/> 
			<div className="collapse-title text-xl">
				friend
			</div> 
			<div className="collapse-content overflow-y-auto h-5/6"> 
				<FriendElement src={"https://img.freepik.com/free-photo/adorable-kitty-looking-like-it-want-to-hunt_23-2149167099.jpg?w=2000"} title={"test1"} request={true}/>
				<FriendElement src={"https://img.freepik.com/free-photo/adorable-kitty-looking-like-it-want-to-hunt_23-2149167099.jpg?w=2000"} title={"test2"}/>
				
			</div>
		</div>
	);
}

export default FriendList