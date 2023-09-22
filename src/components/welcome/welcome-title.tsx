const WelcomeTitle = () => {
	return (
		<div
			className='text-9xl text-transparent font-black bg-cover animate-welcome bg-clip-text mb-8'
			style={{
				backgroundImage: 'url("/images/jollypong.jpeg")',
			}}
		>
			Jolly Ping Pong
		</div>
	);
};

export default WelcomeTitle;
