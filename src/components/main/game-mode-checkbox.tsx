const GameModeCheckbox = () => {
	return (
		<div className='flex form-control'>
			<label className='label cursor-pointer'>
				<input type='checkbox' className='checkbox' />
				<div className='label-text pl-2 text-lg'>Option</div>
			</label>
		</div>
	);
};

export default GameModeCheckbox;
