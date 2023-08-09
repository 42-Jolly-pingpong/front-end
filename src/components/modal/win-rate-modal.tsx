const WinRateModal = () => {
	return (
		<dialog id='modal' className='modal'>
			<form
				method='dialog'
				className='modal-box'
				style={{
					maxWidth: 'none',
					minHeight: '70%',
				}}
			>
				<button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
					✕
				</button>
				<div
					className='font-bold text-lg text-center'
					style={{ fontSize: '24px' }}
				>
					🏆 Win-Rate 🏆
				</div>
				<div className='py-4'>
					<div>이렇게 데이터가 들어가겠져?</div>
				</div>
			</form>
			<form method='dialog' className='modal-backdrop'>
				<button>close</button>
			</form>
		</dialog>
	);
};

export default WinRateModal;
