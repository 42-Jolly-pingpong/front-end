import XButton from '../../../components/button/x-button';
import BackDrop from '../../../components/modal/utils/backdrop';

const WithdrawModal = () => {
	return (
		<dialog id='withdrawModal' className='modal'>
			<form method='dialog' className='modal-box'>
				<XButton />
				<div className='font-bold mb-1'> 회원 탈퇴 모달 입니다.</div>
			</form>
			<BackDrop />
		</dialog>
	);
};

export default WithdrawModal;
