import { useState } from 'react';
import MainGameStart from 'pages/main/components/main-game-start';
import GetUserInfo from 'components/services/getUserInfo';

const Main = () => {
	const [user, setUser] = useState(GetUserInfo(1)); // 이후에 recoil로 바뀔 예정

	return (
		<div className='flex flex-col justify-center items-center bg-blue-300 border-dotted border-4 w-11/12 h-5/6 p-4'>
			{user && <MainGameStart />}
		</div>
	);
};

export default Main;
