import GoogleIcon from 'images/google.png';
import GrayButton from 'components/button/gray-button';
import sendAPI from 'api/sendAPI';
import { useRecoilState } from 'recoil';
import { userState } from 'ts/states/user-state';
import { profileAuthModalState } from 'ts/states/profile/profile-modal-state';
import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import User from 'ts/interfaces/user.model';

const ProfileEditAuth = () => {
	const [user, setUser] = useRecoilState(userState);
	const [authModal, setAuthModal] = useRecoilState(profileAuthModalState);
	const [show, setShow] = useState(false);

	const handleAuth = async () => {
		const data = await sendAPI({
			method: 'GET',
			url: `/user/${user?.id}/otp`,
		});
		const { secret, qr_code } = data;
		setAuthModal({ ...authModal, show: true, secret, qr_code });
	};

	const handleDelete = async () => {
		await sendAPI({
			method: 'DELETE',
			url: `/user/${user?.id}/otp`,
		});
		setAuthModal({ ...authModal, show: false, secret: '', qr_code: '' });
		setUser({ ...user, auth: false } as User);
		setShow(false);
	};

	const deleteQrModal = () => {
		return (
			<Modal size={'sm'} show={show} onClose={() => setShow(false)} popup>
				<Modal.Header />
				<Modal.Body>
					<div className='text-center'>
						<HiOutlineExclamationCircle className='mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200' />
						<h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
							2단계 인증을 삭제하시겠습니까?
						</h3>
						<div className='flex justify-center gap-4'>
							<Button color='failure' onClick={handleDelete}>
								삭제하기
							</Button>
							<Button color='gray' onClick={() => setShow(false)}>
								취소하기
							</Button>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		);
	};

	return (
		<>
			<div className='flex gap-5'>
				<div className='font-bold text-sm w-16'>2FA</div>
				<div className='inline-flex w-full px-3 py-2 bg-gray-50 rounded-lg justify-between items-center'>
					<div className='flex gap-3'>
						<img src={GoogleIcon} />
						<div className='text-gray-900 text-xs font-bold'>
							Google Authenticator
						</div>
					</div>
					{!user?.auth ? (
						<GrayButton size='xs' onClick={handleAuth}>
							추가
						</GrayButton>
					) : (
						<GrayButton size='xs' onClick={() => setShow(true)}>
							삭제
						</GrayButton>
					)}
				</div>
			</div>
			{user?.auth && deleteQrModal()}
		</>
	);
};

export default ProfileEditAuth;
