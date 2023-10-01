import MainGameStart from 'pages/main/components/main-game-start';
import { useRecoilState } from 'recoil';
import { userState } from 'ts/states/user-state';

const Main = () => {
	const [user, setUserState] = useRecoilState(userState);

	console.log('main입성');
	return (
		<div className='flex flex-col justify-center items-center bg-blue-300 border-dotted border-4 w-11/12 h-5/6 p-4'>
			{user && <MainGameStart />}
		</div>
	);
};

export default Main;
