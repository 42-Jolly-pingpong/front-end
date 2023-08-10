const WinRateTitle = () => {
	return (
		<div
			className='font-bold text-lg text-center mb-2'
			style={{ fontSize: '24px' }}
		>
			🏆 Win-Rate 🏆
		</div>
	);
};

const XButton = () => {
	return (
		<button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
			✕
		</button>
	);
};

const WinRateResult = () => {
	return (
		<div className='py-4 border-solid border-t-2'>
			<div className='flex flex-col justify-center items-center mt-1'>
				<div className='text-lg flex justify-center'>승률 : 40% </div>
				<progress
					className='progress flex justify-between items-center w-2/3 h-5'
					value='40'
					max='100'
				/>
			</div>
			<div className='flex flex-col w-full border-opacity-50'>
				<div className='divider' />
				<div className='flex justify-between items-center'>
					<div className='ml-8'>사진 1</div>
					<div className='grid h-20 card bg-base-300 rounded-box place-items-center w-2/3'>
						content
					</div>
					<div className='mr-8'>사진2</div>
				</div>
			</div>
		</div>
	);
};

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
				<XButton />
				<WinRateTitle />
				<WinRateResult />
			</form>
			{/* background click시 창이 닫치도록 설정 */}
			<form method='dialog' className='modal-backdrop'>
				<button>close</button>
			</form>
		</dialog>
	);
};

export default WinRateModal;
