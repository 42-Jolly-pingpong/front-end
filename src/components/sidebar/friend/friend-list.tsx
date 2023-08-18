import { useState } from "react";
import FriendElement from "./friend-element";
import { numberOfFriend, tempUser1 } from "../temp-chat-user"


const FriendList = () => {
	//친구 목록 가져오기
	const [isChecked, setIsChecked] = useState(true);

	const onClickCheckbox = () => {
		setIsChecked((prev) => !prev);
	};

	return (
		<div className="collapse">
			<input type="checkbox" checked={isChecked} onChange={onClickCheckbox}/> 
				<div className="collapse-title text-xl">
					friend ({numberOfFriend})
			</div> 
			<div className="collapse-content overflow-y-auto"> 
				<FriendElement user={tempUser1} request={true}/>
				<FriendElement user={tempUser1}/>
				<FriendElement user={tempUser1}/>
			</div>
		</div>
	);
};

export default FriendList;
