import { ChatParticipantAuth } from 'ts/enums/chat-participants-auth.enum';
import { ChatParticipantStatus } from 'ts/enums/chat-participants-status.enum';
import { ChatParticipant } from 'ts/interfaces/chat-participant.model';

const chatParticipantData: ChatParticipant[] = [
	{
		chatUserIdx: 100,
		roomIdx: 50,
		userIdx: 1,
		auth: ChatParticipantAuth.ADMIN,
		status: ChatParticipantStatus.ACTIVE,
		muteExpirationTime: null,
	},
	{
		chatUserIdx: 101,
		roomIdx: 50,
		userIdx: 2,
		auth: ChatParticipantAuth.OWNER,
		status: ChatParticipantStatus.ACTIVE,
		muteExpirationTime: null,
	},
	{
		chatUserIdx: 102,
		roomIdx: 50,
		userIdx: 2,
		auth: ChatParticipantAuth.USER,
		status: ChatParticipantStatus.ACTIVE,
		muteExpirationTime: new Date('2099-01-01'),
	},
];

export default chatParticipantData;
