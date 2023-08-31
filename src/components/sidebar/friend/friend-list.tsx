import { useState } from 'react';
import FriendElement from './friend-element';
import { numberOfFriend, tempUser1 } from '../temp-chat-user';
import { User } from '../../../ts/interfaces/user.model';

const FriendList = () => {
	//친구 목록 가져오기
	const friendList: User[] = [tempUser1, tempUser1, tempUser1];
	const [isChecked, setIsChecked] = useState(true);

	const onClickCheckbox = () => {
		setIsChecked((prev) => !prev);
	};

	return (
		<div className='collapse'>
			<input type='checkbox' checked={isChecked} onChange={onClickCheckbox} />
			<div className='collapse-title text-xl'>friend ({numberOfFriend})</div>
			<div className='collapse-content overflow-y-auto'>
				{friendList.map((user, id) => (
					<FriendElement user={user} key={id} />
				))}
			</div>
		</div>
	);
};

export default FriendList;
