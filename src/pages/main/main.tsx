import { useEffect, useState } from 'react';
import JoinButton from './components/join-button';
import JoinIntro from './components/join-intro';
import { Socket, io } from 'socket.io-client';

const Main = () => {
	

	return (
		<div className='flex flex-col justify-center items-center text-center mt-72'>
			<JoinIntro />
			<JoinButton />
		</div>
	);
};

export default Main;
