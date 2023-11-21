import { useRecoilState, useRecoilValue } from 'recoil';
import NoMatchBanner from 'components/banner/no-match-banner';
import GameRequestBanner from 'components/banner/game-request-banner';
import { GameBanner } from 'ts/enums/game/game-banner.enum';
import { gameBannerState } from 'ts/states/game/game-banner-state';
import { useEffect, useState } from 'react';
import { socket } from 'socket/socket';
import { GameMode } from 'ts/enums/game/game-mode.enum';
import User from 'ts/interfaces/user.model';
import InviteCancelBanner from './inviteCancel-banner';
import { opponentInfoState } from 'ts/states/game/opponent-info-state';

/**
 * 소켓 통신 중 헤더 위에 띄워질 Banner 입니다.
 *
 * 관련 파일
 * 	enum : src/ts/enums/game/game-banner.enum.ts
 * 	state: src/ts/states/game/game-banner-state.ts
 *
 */

const Banner = () => {
	const [banner, setBanner] = useRecoilState(gameBannerState);
	const [userInfo, setUserInfo] = useState<User | null>(null);
	const opponentInfo = useRecoilValue(opponentInfoState);

	useEffect(() => {
		socket.on('inviteGame', (userInfo: User, mode: GameMode) => {
			setUserInfo(userInfo);
			setBanner({ type: GameBanner.GAMEREQUEST, mode });
		});
		socket.on('inviteCencel', () => {
			setBanner({ ...banner, type: GameBanner.CENCEL });
		});
	});

	switch (banner.type) {
		case GameBanner.GAMEREQUEST: // 게임 request가 왔을 때
			if (userInfo) {
				return <GameRequestBanner userInfo={userInfo} />;
			}
			break;
		case GameBanner.NOMATCH: // 게임 matching에 실패했을 때
			return <NoMatchBanner />;
		case GameBanner.CENCEL:
			return (
				<InviteCancelBanner
					message={userInfo?.nickname + '님이 게임 요청을 취소했어요!'}
				/>
			);
		case GameBanner.REFUSE:
			return (
				<InviteCancelBanner
					message={opponentInfo?.nickname + '님이 게임 요청을 거절했어요!'}
				/>
			);
		default:
			return null;
	}
};

export default Banner;
