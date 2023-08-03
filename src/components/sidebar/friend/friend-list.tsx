import { useState } from "react";
import FriendElement from "./friend-element";
import { User } from "../../../ts/interfaces/userr.model";
import { numberOfFriend, tempUser1 } from "../temp-chat-user"

const FriendList = () => {
	//친구 목록 가져오기
	const [isChecked, setIsChecked] = useState(true);

	const onClickCheckbox = () => {
		setIsChecked((prev) => prev? false : true)
	}

	return (
		<div className="flex flex-col justify-between">
			<div className="collapse">
				<input type="checkbox" checked={isChecked} onClick={onClickCheckbox}/> 
					<div className="collapse-title text-xl">
						friend ({numberOfFriend})
				</div> 
				<div className="collapse-content overflow-y-auto"> 
					<FriendElement user={tempUser1} request={true}/>
					<FriendElement user={tempUser1}/>
					<FriendElement user={tempUser1}/>
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