import JoinButton from 'pages/main/components/join-button';
import JoinIntro from 'pages/main/components/join-intro';
import PingPongAnimation from 'pages/main/components/ping-pong-animation';

const Main = () => {
	// const setIsGame = useSetRecoilState(gameStartState);

	return (
		<div className='flex flex-col justify-center items-center text-center h-screen gap-y-12 2xl:gap-y-24'>
			<JoinIntro />
			<PingPongAnimation />
			<JoinButton />
		</div>
	);
};

export default Main;
