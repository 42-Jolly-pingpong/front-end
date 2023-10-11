import { ChatParticipantRole } from 'ts/enums/chat-participants-role.enum';
import { ChatParticipantStatus } from 'ts/enums/chat-participants-status.enum';
import { ChatParticipant } from 'ts/interfaces/chat-participant.model';
import userData from 'ts/mock/user-data';

const chatParticipantData: ChatParticipant[] = [
	{
		user: userData[0],
		role: ChatParticipantRole.ADMIN,
		status: ChatParticipantStatus.DEFAULT,
		muteExpirationTime: null,
	},
	{
		user: userData[1],
		role: ChatParticipantRole.OWNER,
		status: ChatParticipantStatus.DEFAULT,
		muteExpirationTime: null,
	},
	{
		user: userData[2],
		role: ChatParticipantRole.MEMBER,
		status: ChatParticipantStatus.DEFAULT,
		muteExpirationTime: new Date('2099-01-01'),
	},
];

export default chatParticipantData;
