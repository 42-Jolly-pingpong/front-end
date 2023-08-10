import { useState } from "react";

const FriendRequested = () => {
	// 친구 신청 목록 가져오기
	const [isChecked, setIsChecked] = useState(true);

	const onClickCheckbox = () => {
		setIsChecked((prev) => prev? false : true)
	}

	return (
		<div className="collapse collapse-arrow">
			<input type="checkbox" checked={isChecked} onClick={onClickCheckbox}/> 
			<div className="collapse-title text-xl">
			friend requested
			</div>
		</div>	
		);
}

export default FriendRequested