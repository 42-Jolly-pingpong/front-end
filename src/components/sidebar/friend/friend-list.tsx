import { useState } from 'react';
import FriendElement from 'components/sidebar/friend/friend-element';
import { User } from 'ts/interfaces/user.model';
import { numberOfFriend, tempUser1 } from '../temp-chat-user'; //임시

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
