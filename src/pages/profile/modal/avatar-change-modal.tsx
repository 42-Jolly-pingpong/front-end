import XButton from '../../../components/button/x-button';
import BackDrop from '../../../components/modal/utils/backdrop';

const AvatarChangeModal = () => {
	return (
		<dialog id='avatarChangeModal' className='modal'>
			<form method='dialog' className='modal-box'>
				<XButton />
				<div className='font-bold mb-1'>
					file upload를 통한 avatar 변경 모달입니다.
				</div>
			</form>
			<BackDrop />
		</dialog>
	);
};

export default AvatarChangeModal;
