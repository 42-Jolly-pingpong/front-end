export enum ProfileStatus {
	MINE,
	FRIEND,
	REQUESTED_BY_ME,
	REQUESTED_BY_OTHER,
	BLOCKED_BY_ME,
	BLOCKED_BY_OTHER,
	UNKNOWN, // 탈퇴한 유저. 없는 유저. 내가 누군가에게 차단당한 유저일때
	UNDEFINED, //유저가 있지만 나랑 아무 관계가 아닐때
}
