type BannerProgressProps = {
	progress: number;
};

const BannerProgress: React.FC<BannerProgressProps> = ({ progress }) => {
	const progressWidth = {
		width: progress + '%',
	};

	return (
		<div className='w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700'>
			<div
				className='bg-yellow-300 h-2.5 rounded-full'
				style={progressWidth}
			></div>
		</div>
	);
};

export default BannerProgress;
