const WelcomeTitle = () => {
	return (
		<div
			className='uppercase text-6xl lg:text-8xl xl:text-9xl text-center text-transparent pb-12 font-black bg-clip-text animate-welcome select-none'
			style={{
				backgroundImage: 'url("/images/jollypong4.jpeg")',
			}}
		>
			Jolly Ping Pong
		</div>
	);
};

export default WelcomeTitle;
