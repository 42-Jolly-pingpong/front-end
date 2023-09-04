import { useState } from 'react';
import FriendElement from 'components/sidebar/friend/friend-element';
import { User } from 'ts/interfaces/user.model';

const FriendRequested = (props: { requestList: User[] }) => {
	const [isChecked, setIsChecked] = useState(true);

	const onChangeCheckbox = () => {
		setIsChecked((prev) => !prev);
	};

	return (
		<div className='collapse collapse-arrow'>
			<input type='checkbox' checked={isChecked} onChange={onChangeCheckbox} />
			<div className='collapse-title text-xl'>friend requested</div>
			<div className='collapse-content overflow-y-auto'>
				{props.requestList.map((user, id) => (
					<FriendElement user={user} request={true} key={id} />
				))}
			</div>
		</div>
	);
};

export default FriendRequested;
