import { useState } from 'react';

const FriendRequested = () => {
	// 친구 신청 목록 가져오기
	const [isChecked, setIsChecked] = useState(true);

	const onChangeCheckbox = () => {
		setIsChecked((prev) => !prev);
	};

	return (
		<div className='collapse collapse-arrow'>
			<input type='checkbox' checked={isChecked} onChange={onChangeCheckbox} />
			<div className='collapse-title text-xl'>friend requested</div>
		</div>
	);
};

export default FriendRequested;
