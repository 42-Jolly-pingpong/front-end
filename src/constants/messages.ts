/**
 * 이 파일은 message 관련 constants 입니다.
 */

/* game - banner */
export const NO_MATCH_MSG =
	'경기를 원하는 다른 사용자가 없어서 게임이 취소되었습니다.';

export const GAME_REQ_MSG = '님이 게임 요청을 보냈어요!';

/* profile - friend modal*/
export const friendModalMessage: { [key: string]: string } = {
	BLOCKEDBYME: '사용자를 차단 해제할까요?',
	FRIEND: '친구 관계를 끊을까요?',
	REQUESTEDBYME: '친구 요청을 취소할까요?',
};

export const friendModalButtonMessages: { [key: string]: string } = {
	BLOCKEDBYME: '해제하기',
	FRIEND: '친구 취소',
	REQUESTEDBYME: '요청 취소',
};
