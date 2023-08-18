import { useState } from 'react';
import XButton from '../button/x-button';
import BackDrop from './utils/backdrop';

const TwoFactorAuthModal = () => {
	const [vertificationCode, setVertificationCode] = useState('');

	return (
		<dialog id='twoFactorAuthModal' className='modal box'>
			<form method='dialog' className='modal-box'>
				<XButton />
				<div className='flex flex-col items-center'>
					<div className='font-bold mb-3 text-3xl'>
						{' '}
						TWO-FACTOR-AUTH{' '}
					</div>
					<div className='text-xl mb-5'>
						Enter the vertification code.
					</div>
					<input
						type='text'
						placeholder='Type here'
						className='input input-bordered w-full max-w-xs mb-5'
					/>
					<button className='btn btn-neutral'>Submit</button>
				</div>
			</form>
			<BackDrop />
		</dialog>
	);
};

export default TwoFactorAuthModal;
