import { Badge } from 'flowbite-react';
import MemberInfo from 'pages/chat/components/sidebar/member-info';
import NoResult from 'pages/chat/components/sidebar/no-result';
import { ChatParticipantRole } from 'ts/enums/chat-participants-role.enum';
import { ChatParticipant } from 'ts/interfaces/chat-participant.model';

const InChannelList = (props: { memberList: ChatParticipant[] }) => {
	const { memberList } = props;

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

	if (memberList.length === 0) {
		return (
			<div className='pb-3'>
				<div className='p-3 text-xs font-bold text-gray-600'>이 채널에서</div>
				<NoResult />
			</div>
		);
	}
	return (
		<div className=''>
			<div className='p-3 text-xs font-bold text-gray-600'>이 채널에서</div>
			{memberList.map((member, id) => (
				<div
					className='px-4 py-3 flex items-center w-full hover:bg-gray-200'
					key={id}
				>
					<MemberInfo user={member.user} isMe={false} />
					<div className='ml-2'>{roleBadge(member.role)}</div>
				</div>
			))}
		</div>
	);
};

export default InChannelList;
