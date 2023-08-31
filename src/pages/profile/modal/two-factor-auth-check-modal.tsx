import XButton from '../../../components/button/x-button';
import BackDrop from '../../../components/modal/utils/backdrop';

const TwoFactorAuthCheckModal = () => {
	return (
		<dialog id='twoFactorAuthCheckModal' className='modal'>
			<form method='dialog' className='modal-box'>
				<XButton />
				<div className='font-bold mb-1'> 2차 인증 모달입니다.</div>
			</form>
			<BackDrop />
		</dialog>
	);
};

export default TwoFactorAuthCheckModal;
