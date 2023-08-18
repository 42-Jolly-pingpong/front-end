import { useState } from 'react';
import GetUserInfo from '../utils/getUserInfo';

const ProfileData = () => {
	const [user, setUser] = useState(GetUserInfo());
	return (
		<div className='flex flex-col mx-5'>
			<div className='text-2xl mb-3'>{`- ID : ${user?.intra_id}`}</div>
			<div className='text-2xl mb-3'>{`- EMAIL : ${user?.e_mail}`}</div>
			<div className='text-2xl mb-3'>{`- NICKNAME : ${user?.nickname}`}</div>
			<div className='text-2xl mb-3'>{`- WIN_RATE : ${user?.win_rate}%`}</div>
		</div>
	);
};

export default ProfileData;
