import { Badge } from 'flowbite-react';
import MemberDotButton from 'pages/chat/components/sidebar/member-dot-button';
import MemberInfo from 'pages/chat/components/sidebar/member-info';
import { useRecoilValue } from 'recoil';
import { ChatParticipantRole } from 'ts/enums/chat-participants-role.enum';
import { ChatParticipant } from 'ts/interfaces/chat-participant.model';
import User from 'ts/interfaces/user.model';
import { userState } from 'ts/states/user-state';

const MemberInquireItem = (props: { participant: ChatParticipant }) => {
	const user = useRecoilValue(userState) as User;
	const { participant } = props;

	const roleBadge = (role: ChatParticipantRole) => {
		switch (role) {
			case ChatParticipantRole.OWNER:
				return <Badge color='pink'>소유주</Badge>;
			case ChatParticipantRole.ADMIN:
				return <Badge color='indigo'>관리자</Badge>;
			case ChatParticipantRole.MEMBER:
				return null;
		}
	};

	return (
		<div className='px-4 py-3 flex items-center justify-between w-full hover:bg-gray-200'>
			<div className='flex items-center'>
				<MemberInfo
					user={participant.user}
					isMe={participant.user.id === user.id}
				/>
				<div className='ml-2'>{roleBadge(participant.role)}</div>
			</div>
			{participant.user.id !== user.id && (
				<MemberDotButton participant={participant} />
			)}
		</div>
	);
};

export default MemberInquireItem;
