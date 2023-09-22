import { useRecoilState } from 'recoil';
import { userState } from 'ts/states/user-state';

const Welcome = () => {
	const [user, setUser] = useRecoilState(userState);

	const handleLogin = () => {};

	return (
		<div className='flex flex-col justify-center items-center h-screen w-screen'>
			<div
				className='text-9xl text-transparent font-black bg-cover animate-welcome bg-clip-text'
				style={{
					backgroundImage: 'url("/images/jollypong.jpeg")',
				}}
			>
				Jolly Ping Pong
			</div>

			<h1> button 자리 </h1>
		</div>
	);
};

export default Welcome;
