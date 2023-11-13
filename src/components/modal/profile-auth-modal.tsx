import sendAPI from 'api/sendAPI';
import YellowButton from 'components/button/yellow-button';
import { Modal } from 'flowbite-react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { profileAuthModalState } from 'ts/states/profile/profile-modal-state';
import { userState } from 'ts/states/user-state';

const ProfileAuthModal = () => {
	const user = useRecoilValue(userState);
	const [authModal, setAuthModal] = useRecoilState(profileAuthModalState);

	const handleClose = () => {
		setAuthModal({ ...authModal, show: false });
	};

	const handleComplete = async () => {
		const data = await sendAPI({
			method: 'POST',
			url: `/user/${user?.id}/otp`,
			body: {
				secret: authModal.secret,
				qr_code: authModal.qr_code,
			},
		});
		console.log(data);
		setAuthModal({ show: false, secret: '', qr_code: '' });
	};

	return (
		<Modal size={'sm'} show={authModal.show} onClose={handleClose} popup>
			<Modal.Header />
			<Modal.Body>
				<div className='flex flex-col justify-center items-center gap-4'>
					<h3 className='text-lg font-normal text-gray-500 dark:text-gray-400'>
						2차 인증 QR 코드
					</h3>
					<img src={authModal.qr_code} />
					<p className='text-sm px-4'>
						Authy나 Google Authenticator 앱을 이용해 QR 코드를 스캔해주세요.
					</p>
					<div className='flex justify-center'>
						<YellowButton onClick={handleComplete}>
							<div className='w-64'>등록 완료</div>
						</YellowButton>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default ProfileAuthModal;
