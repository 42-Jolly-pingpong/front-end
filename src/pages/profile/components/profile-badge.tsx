import React from 'react';
import UserDTO from '../../../ts/interfaces/userDto';

const ProfileBadge: React.FC<UserDTO> = (props) => {
	const { intra_id, status, is_leave } = props;

	return (
		<div className={`avatar layout-icon`} tabIndex={0}>
			<img
				src={props.avatar_path}
				alt='Avatar'
				className='rounded-full'
			/>
		</div>
	);
};

export default ProfileBadge;
