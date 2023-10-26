export enum ProfileStatus {
	MINE = 'MINE',
	FRIEND = 'FRIEND',
	REQUESTED = 'REQUESTED',
	BLOCKEDBYME = 'BLOCKEDBYME',
	BLOCKEDBYOTHER = 'BLOCKEDBYOTHER',
	UNKNOWN = 'UNKNOWN', // 탈퇴한 유저. 없는 유저. 내가 차단당한 유저일때
	UNDEFINED = 'UNDEFINED', //유저가 있지만 나랑 아무 관계가 아닐때
}
