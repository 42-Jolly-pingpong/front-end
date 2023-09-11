import { useState } from 'react';
import TwoFactorAuthModal from 'pages/profile/modal/two-factor-auth-check-modal';
import WithdrawModal from 'pages/profile/modal/withdraw-modal';
import AvatarChangeModal from 'pages/profile/modal/avatar-change-modal';
import ProfileData from 'pages/profile/components/profile-data';
import GetUserInfo from 'components/services/getUserInfo';

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
	const [user, setUser] = useState(GetUserInfo(1));

	return (
		<div className='flex justify-center items-center w-11/12 h-5/6 mb-10'>
			<div className='flex justify-center items-center w-3/5 '>
				<fieldset className='flex flex-col border-4 border-black w-5/6 bg-gray-200 rounded-md'>
					<legend className='flex justify-center items-center border-solid mb-2  text-center '>
						<div className='avatar'>
							<div className='w-40 rounded-full ring-4 ring-offset-4 ring-offset-black'>
								<img src={`${user?.avatarPath}`} />
							</div>
						</div>
					</legend>
					<div className='flex justify-center ml-32 mb-2'>
						<div className='btn bg-gray-200 w-16' onClick={handleAvatarChange}>
							<img src='/images/pen-clip-solid.svg' />
						</div>
						<AvatarChangeModal />
					</div>
					<ProfileData />
					<div className='divider mb-5 mx-20' />
					<div className='flex flex-col justify-center items-center mb-3'>
						<div className='btn bg-gray-200 mb-2' onClick={handleAuth}>
							TWO-FACTOR AUTHENTICATION
						</div>
						<TwoFactorAuthModal />
						<div className='btn bg-gray-200 mb-2' onClick={handleWithdraw}>
							WITHDRAW MEMBER
						</div>
						<WithdrawModal />
					</div>
				</fieldset>
			</div>
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
//	GetUserInfo(1);
//}, []);

//<div className='flex'>
//	<div className='container mx-auto mt-52 mb-{60} '>
//		<div>
//			<div className=' bg-zinc-200 flex shadow rounded-lg w-5/6 md:w-5/6 lg:w-4/6 xl:w-3/6 mx-auto'>
//				<div className='flex justify-center'>
//					<img
//						src={userInfo?.avatarPath}
//						alt=''
//						className='rounded-full mx-auto absolute -top-20 w-48 h-48 shadow-md border-4 border-black transition duration-200 hover:scale-110'
//					></img>
//				</div>
//				<div className='mt-40'>
//					<div className='ml-16'>
//						<div className='flex'>
//							<span className='w-28'>ID</span>
//							<span className='ml-3 mb-3 w-10'>:</span>
//							<span>{userInfo?.intraId}</span>
//						</div>
//						<div className='flex'>
//							<span className='w-28'>email</span>
//							<span className='ml-3 mb-3 w-10'>:</span>
//							<span>{userInfo?.email}</span>
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
