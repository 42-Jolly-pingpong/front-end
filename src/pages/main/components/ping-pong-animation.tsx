const PingPongAnimation = () => {
	return (
		<div className='ping-body w-full h-44'>
			<div className='pingpong'>
				<div className='table'>
					<div className='line' />
					<div className='net-top' />
					<div className='net-middle' />
					<div className='net-bottom' />
					<div className='net-shadow' />
				</div>
				<div className='c1 animate-rotate-c1'>
					<div className='b1' />
				</div>
				<div className='c2 animate-rotate-c2'>
					<div className='b2' />
				</div>
				<div className='c3 animate-rotate-c3'>
					<div className='b3' />
				</div>
				<div className='c4 animate-rotate-c4'>
					<div className='b4' />
				</div>
				<span className='ping animate-anim-ping'>핑</span>
				<span className='pong animate-anim-pong'>퐁</span>
			</div>
		</div>
	);
};

export default PingPongAnimation;
