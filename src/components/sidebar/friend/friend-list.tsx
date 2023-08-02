import { useState } from "react";
import FriendElement from "./friend-element";

const FriendList = () => {
	//친구 목록 가져오기
	const [isChecked, setIsChecked] = useState(true);

	const onClickCheckbox = () => {
		setIsChecked((prev) => prev? false : true)
	}

	const amount = 10;

	return (
		<div className="flex flex-col justify-between">
			<div className="collapse">
				<input type="checkbox" checked={isChecked} onClick={onClickCheckbox}/> 
					<div className="collapse-title text-xl">
						friend ({amount})
				</div> 
				<div className="collapse-content overflow-y-auto"> 
					<FriendElement src={"https://img.freepik.com/free-photo/adorable-kitty-looking-like-it-want-to-hunt_23-2149167099.jpg?w=2000"} title={"test1"} request={true}/>
					<FriendElement src={"https://img.freepik.com/free-photo/adorable-kitty-looking-like-it-want-to-hunt_23-2149167099.jpg?w=2000"} title={"test2"}/>
					<FriendElement src={"https://img.freepik.com/free-photo/adorable-kitty-looking-like-it-want-to-hunt_23-2149167099.jpg?w=2000"} title={"test3"}/>
				</div>
			</div>
			<div className="flex justify-ends">
				<button className="btn btn-outline">+</button>
				<button className="btn btn-outline">블락</button>
			</div>
		</div>
	);
}

export default FriendList