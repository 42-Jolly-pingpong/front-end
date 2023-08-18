import React from 'react';
import UserDTO from '../../../ts/interfaces/userDto';

const ProfileStatusBadge: React.FC<UserDTO> = (props) => {
	const { intra_id, status, is_leave } = props;

	return (
		<div
			className={`avatar ${status ? 'online' : 'offline'} layout-icon`}
			tabIndex={0}
		>
			<img
				src={props.avatar_path}
				alt='Avatar'
				className='rounded-full'
			/>
		</div>
	);
};

export default ProfileStatusBadge;
