import { useState } from 'react';
import { FiUsers } from 'react-icons/fi';
import { useRecoilValue } from 'recoil';
import { ProfileStatus } from 'ts/enums/profile/profile-status.enum';
import { profileState } from 'ts/states/profile/profile-state';

const ProfileNoFriend = () => {
	const profile = useRecoilValue(profileState);
	const myHistory = useState(profile.type === ProfileStatus.MINE);

	return (
		<div className='flex flex-col items-center justify-center gap-6 mt-16'>
			<div className='w-16 h-16 p-2 rounded-full border-2 border-black justify-center items-center inline-flex'>
				<FiUsers size='40' />
			</div>
			<div className='font-extrabold text-3xl'>빈 친구 목록</div>
			{myHistory && (
				<div className='font-sm'>
					누군가를 친구로 추가하면 여기에 표시됩니다.
				</div>
			)}
		</div>
	);
};

export default ProfileNoFriend;
