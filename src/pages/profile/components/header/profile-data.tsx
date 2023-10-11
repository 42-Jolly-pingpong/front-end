import { useRecoilValue } from 'recoil';
import { userState } from 'ts/states/user-state';

const ProfileData = () => {
	const user = useRecoilValue(userState);

	console.log(user);
	return (
		<div className='flex flex-col'>
			<div id='header-line' className='text-bold'>
				{user?.nickname}
			</div>
			{/*<div> 닉네임, 친구추가 버튼, 메시지 버튼, 점 3개</div>
			<div> 0경기 0승리 0패배 </div>
			<div> intraId</div>
			<div> bio</div>*/}
		</div>
	);
};

export default ProfileData;
