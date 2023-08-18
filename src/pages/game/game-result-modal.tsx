const GameResultModal = () => {
	return (
		<dialog id='gameResultModal' className='modal'>
			<form
				method='dialog'
				className='flex flex-col items-center modal-box border-solid border-4 w-4/5'
			>
				<fieldset className='flex justify-center items-center border-4 border-black rounded-md mt-10 mb-10 h-5/6 w-5/6 '>
					<legend className='font-bold text-5xl border-solid mb-8 mx-1'>
						YOU WIN
					</legend>
					<div className='flex flex-col items-center justify-center rounded-md w-72 h-72 px-2  bg-orange-200 mb-8'>
						<button className='btn btn-outline border-solid border-2 text-2xl bg-white'>
							Main Page
						</button>
						<button className='btn btn-outline border-solid border-2 my-6 text-2xl bg-white'>
							Try Again
						</button>
						<button className='btn btn-outline border-solid border-2 text-2xl bg-white'>
							New Game
						</button>
					</div>
				</fieldset>
			</form>
		</dialog>
	);
};

export default GameResultModal;
