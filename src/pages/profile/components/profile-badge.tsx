import React from 'react';
import { User } from 'ts/interfaces/user.model';

const ProfileBadge: React.FC<User> = (props) => {
	const { intraId, status, isLeave } = props;

	return (
		<div className='avatar layout-icon' tabIndex={0}>
			<img src={props.avatarPath} alt='Avatar' className='rounded-full' />
		</div>
	);
};

export default ProfileBadge;
