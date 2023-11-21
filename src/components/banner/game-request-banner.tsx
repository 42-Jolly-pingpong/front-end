import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import CancelButton from 'components/button/cancel-button';
import YellowButton from 'components/button/yellow-button';
import BannerIcon from 'components/banner/item/banner-icon';
import BannerMessage from 'components/banner/item/banner-message';
import { GameBanner } from 'ts/enums/game/game-banner.enum';
import { gameBannerState } from 'ts/states/game/game-banner-state';
import { GAME_REQ_MSG } from 'constants/messages';
import { socket } from 'socket/socket';
import User from 'ts/interfaces/user.model';
import { Progress } from 'flowbite-react';
import ProgressTheme from './theme/progress-theme';

interface propsType {
	userInfo: User;
}

const GameRequestBanner = ({ userInfo }: propsType) => {
	const [gameBanner, setGameBanner] = useRecoilState(gameBannerState);
	const [progressValue, setProgressValue] = useState(100);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setProgressValue((prev) => (prev -= 0.1));
		}, 10);

		return () => {
			clearInterval(intervalId);
		};
	}, []);

	useEffect(() => {
		if (progressValue < 0) handleCancel();
	}, [progressValue]);

	const handleMatch = () => {
		socket.emit(
			'acceptInvite',
			JSON.stringify({ user: userInfo, mode: gameBanner.mode })
		);
		setGameBanner({ ...gameBanner, type: GameBanner.NONE });
	};

	const handleCancel = () => {
		socket.emit(
			'refuseInvite',
			JSON.stringify({ user: userInfo, mode: gameBanner.mode })
		);
		setGameBanner({ ...gameBanner, type: GameBanner.NONE });
	};

	return (
		<>
			<div className='fixed z-50 flex justify-center w-full mt-6'>
				<div className='fixed w-11/12 border rounded bg-white '>
					<div className='flex justify-between p-4 items-center'>
						<div className='flex'>
							<BannerIcon />
							<BannerMessage message={userInfo.nickname + GAME_REQ_MSG} />
						</div>
						<div className='flex items-center'>
							<YellowButton size='xs' onClick={handleMatch}>
								승낙하기
							</YellowButton>
							<div className='mr-4' />
							<CancelButton size='xs' onClick={handleCancel} />
						</div>
					</div>

					<div className='w-full p-1 rounded-full'>
						<Progress
							progress={progressValue}
							color='yellow'
							theme={ProgressTheme}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default GameRequestBanner;
