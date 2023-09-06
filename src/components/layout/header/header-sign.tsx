import TwoFactorAuthModal from 'components/modal/two-factor-auth-modal';
import { Link } from 'react-router-dom';

const handleSignIn = () => {
	// back-end API : jwt 확인 | intra login (login)
	// back-end API : 2차 인증 확인
	window.twoFactorAuthModal.showModal();
};

const HeaderSign = () => {
	return (
		<div className='flex justify-between'>
			<button className='btn' onClick={handleSignIn}>
				SIGN IN
			</button>
			<TwoFactorAuthModal />
			<button className='btn'>
				<Link to='/sign-up'> SIGN UP </Link>
			</button>
		</div>
	);
};

export default HeaderSign;
