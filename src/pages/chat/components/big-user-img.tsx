const BigUserImg = (props: { src: string }) => {
	if (props.src === null) {
		return (
			<div
				className={`relative w-64 h-64 overflow-hidden bg-gray-100 rounded dark:bg-gray-600`}
			>
				<svg
					className={`absolute w-64 h-64 text-gray-400 -left-1`}
					fill='currentColor'
					viewBox='0 0 20 20'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						fillRule='evenodd'
						d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
						clipRule='evenodd'
					></path>
				</svg>
			</div>
		);
	}
	return (
		<div className={`h-64 w-64 overflow-hidden`}>
			<img src={props.src} className='object-cover w-full h-full rounded-md' />
		</div>
	);
};

export default BigUserImg;
