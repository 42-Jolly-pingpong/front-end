import { useState } from "react";
import FriendElement from "./friend-element";
import { User } from "../../../ts/interfaces/userr.model";

const FriendList = () => {
	//친구 목록 가져오기
	const [isChecked, setIsChecked] = useState(true);

	const onClickCheckbox = () => {
		setIsChecked((prev) => prev? false : true)
	}

	const amount = 10; //temp

	const tempUser : User = {
		id : 1,
		nickname : "temp",
		avatar: "https://img.freepik.com/free-photo/adorable-kitty-looking-like-it-want-to-hunt_23-2149167099.jpg?w=2000"
	} //temp
	
	return (
		<div className="flex flex-col justify-between">
			<div className="collapse">
				<input type="checkbox" checked={isChecked} onClick={onClickCheckbox}/> 
					<div className="collapse-title text-xl">
						friend ({amount})
				</div> 
				<div className="collapse-content overflow-y-auto"> 
					<FriendElement user={tempUser} request={true}/>
					<FriendElement user={tempUser}/>
					<FriendElement user={tempUser}/>
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