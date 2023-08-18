// back-end API : 42API로 얻은 user.intra_id 가져오기

// back-end API : duplicate check

// back-end API : email check

//
const SignUp = () => {
	return (
		<>
			<div className='flex w-full h-full justify-center items-center'>
				<div className='flex flex-col items-center border-solid border-4 w-2/5 h-4/5 p-4 pt-10'>
					<div className='text-center text-3xl mb-16'>
						{' '}
						Welcome to Jolly-Ping Pong!
					</div>
					<div className='mb-8'>
						<input
							type='text'
							placeholder='INTRA ID'
							className='input input-bordered w-full max-w-xs'
							disabled
						/>
					</div>
					<div className='flex flex-row mb-8'>
						<input
							type='text'
							placeholder='Nickname'
							className='input input-bordered w-full max-w-xs'
						/>
						<button className='btn btn-success ml-2'>
							{' '}
							duplicate check
						</button>
					</div>
					<div className='text-slate-500 mb-4'>
						{' '}
						An email has been sent to your intra email...
					</div>
					<div className='flex flex-row mb-12'>
						<input
							type='text'
							placeholder='email'
							className='input input-bordered w-full max-w-xs'
						/>
						<button className='btn btn-success ml-2'> check</button>
					</div>
					<button className='btn btn-success w-1/5'>Join</button>
				</div>
			</div>
		</>
	);
};

export default SignUp;
