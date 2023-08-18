import { useState } from 'react';
import FriendElement from './friend-element';
import { User } from '../../../ts/interfaces/user.model';
import { tempUser1 } from '../temp-chat-user';

const FriendRequested = (props: {requestList: User[]}) => {
	const [isChecked, setIsChecked] = useState(true);

	const onClickCheckbox = () => {
		setIsChecked((prev) => !prev);
	};

	return (
		<div className='collapse collapse-arrow'>
			<input
				type='checkbox'
				checked={isChecked}
				onClick={onClickCheckbox}
			/>
			<div className='collapse-title text-xl'>friend requested</div>
			<div className="collapse-content overflow-y-auto"> 
				{
					props.requestList.map((user, id) => (
						<FriendElement user={user} request={true} key={id}/>
					))
				}
			</div>
		</div>
	);
};

export default FriendRequested;
