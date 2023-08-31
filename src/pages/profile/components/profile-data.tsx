import { useState } from 'react';
import GetUserInfo from '../../../components/services/getUserInfo';

const ProfileData = () => {
	const [user, setUser] = useState(GetUserInfo());
	return (
		<div className='flex flex-col mx-5'>
			<div className='text-2xl mb-3'>{`- ID : ${user?.intraId}`}</div>
			<div className='text-2xl mb-3'>{`- EMAIL : ${user?.email}`}</div>
			<div className='text-2xl mb-3'>{`- NICKNAME : ${user?.nickname}`}</div>
			<div className='text-2xl mb-3'>{`- WIN_RATE : ${user?.winCount}%`}</div>
		</div>
	);
}; //승률 계산 수정 필요1!!!!!!!!!!!!!!!!!!!!!!!!

export default ProfileData;
