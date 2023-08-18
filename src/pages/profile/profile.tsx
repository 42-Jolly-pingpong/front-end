import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserDTO from './userDto';
import userData from './Mock-up/userData';
import ProfileText from './profileText';

function Profile() {
	const [userInfo, setUserInfo] = useState<UserDTO>();
	const user_idx = useParams().user_idx!;
	const idx: number = parseInt(user_idx, 10);
	const getUserInfo = async () => {
		setUserInfo(userData[idx]);
	};
	useEffect(() => {
		getUserInfo();
		console.log(userInfo);
	}, []);
	return (
		<div>
			<div className='flex'>
				<img
					src={userInfo?.avatar_path}
					alt=''
					className='rounded-full mx-auto mt-5 -top-20 w-40 h-40 shadow-md border-8 border-black transition duration-200 hover:scale-110'
				></img>
			</div>
			<div className='border-4 border-black text-center mt-6 mx-auto'>
				<ProfileText item='ID' value={userInfo?.intra_id} />
				<ProfileText item='E_MAIL' value={userInfo?.e_mail} />
			</div>
		</div>
	);
}

export default Profile;

/*  <img
                src={userInfo?.avatar_path}
                alt=''
                className='rounded-full mx-auto absolute -top-20 w-48 h-48 shadow-md border-4 border-black transition duration-200 hover:scale-110'
              ></img>*/
