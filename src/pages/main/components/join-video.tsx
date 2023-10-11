const JoinVideo = () => {
	return (
		<div className='w-full max-w-screen-lg'>
			<video muted autoPlay loop>
				<source src='/videos/test.mp4' type='video/mp4' />
			</video>
		</div>
	);
};

export default JoinVideo;
