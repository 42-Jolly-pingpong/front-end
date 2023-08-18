import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserDTO from '../../ts/interfaces/userDto';
import userData from '../../ts/mock/user-data';
import GetUserInfo from '../../components/services/getUserInfo';
import TwoFactorAuthModal from './modal/two-factor-auth-check-modal';
import WithdrawModal from './modal/withdraw-modal';
import AvatarChangeModal from './modal/avatar-change-modal';
import ProfileData from './components/profile-data';

const handleAuth = () => {
	window.twoFactorAuthCheckModal.showModal();
};

const handleWithdraw = () => {
	window.withdrawModal.showModal();
};

const handleAvatarChange = () => {
	window.avatarChangeModal.showModal();
};

const Profile = () => {
	const [user, setUser] = useState(GetUserInfo());

	return (
		<div className='flex justify-center items-center w-11/12 h-5/6 mb-10'>
			<form className='flex justify-center items-center w-3/5 '>
				<fieldset className='flex flex-col border-4 border-black w-5/6 bg-gray-200 rounded-md'>
					<legend className='flex justify-center items-center border-solid mb-2  text-center '>
						<div className='avatar'>
							<div className='w-40 rounded-full ring-4 ring-offset-4 ring-offset-black'>
								<img src={`${user?.avatar_path}`} />
							</div>
						</div>
					</legend>
					<div className='flex justify-center ml-32 mb-2'>
						<div
							className='btn bg-gray-200 w-16'
							onClick={handleAvatarChange}
						>
							<img src='/images/pen-clip-solid.svg' />
						</div>
						<AvatarChangeModal />
					</div>
					<ProfileData />
					<div className='divider mb-5 mx-20' />
					<div className='flex flex-col justify-center items-center mb-3'>
						<div
							className='btn bg-gray-200 mb-2'
							onClick={handleAuth}
						>
							TWO-FACTOR AUTHENTICATION
						</div>
						<TwoFactorAuthModal />
						<div
							className='btn bg-gray-200 mb-2'
							onClick={handleWithdraw}
						>
							WITHDRAW MEMBER
						</div>
						<WithdrawModal />
					</div>
				</fieldset>
			</form>
		</div>
	);
};

export default Profile;

// black-hole
//const user_idx = useParams().user_idx!;
//const idx: number = parseInt(user_idx, 10);
//const getUserInfo = async () => {
//	setUserInfo(userData[idx]);
//};
//useEffect(() => {
//	getUserInfo();
//}, []);

//<div className='flex'>
//	<div className='container mx-auto mt-52 mb-{60} '>
//		<div>
//			<div className=' bg-zinc-200 flex shadow rounded-lg w-5/6 md:w-5/6 lg:w-4/6 xl:w-3/6 mx-auto'>
//				<div className='flex justify-center'>
//					<img
//						src={userInfo?.avatar_path}
//						alt=''
//						className='rounded-full mx-auto absolute -top-20 w-48 h-48 shadow-md border-4 border-black transition duration-200 hover:scale-110'
//					></img>
//				</div>
//				<div className='mt-40'>
//					<div className='ml-16'>
//						<div className='flex'>
//							<span className='w-28'>ID</span>
//							<span className='ml-3 mb-3 w-10'>:</span>
//							<span>{userInfo?.intra_id}</span>
//						</div>
//						<div className='flex'>
//							<span className='w-28'>E_MAIL</span>
//							<span className='ml-3 mb-3 w-10'>:</span>
//							<span>{userInfo?.e_mail}</span>
//						</div>
//						<div className='flex'>
//							<span className='w-28'>NICKNAME</span>
//							<span className='ml-3 mb-3 w-10'>:</span>
//							<span>{userInfo?.nickname}</span>
//						</div>
//						<div className='flex'>
//							<span className=' w-28'>WIN RATE</span>
//							<span className='ml-3 mb-3 w-10'>:</span>
//							<span>{userInfo?.win_rate}%</span>
//						</div>
//					</div>
//				</div>
//			</div>
//		</div>
//	</div>
//</div>
