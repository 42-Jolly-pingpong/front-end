import { TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { ChatParticipant } from 'ts/interfaces/chat-participant.model';
import { ChatRoom } from 'ts/interfaces/chat-room.model';
import { BiSearch } from 'react-icons/bi';
import { FiUserPlus } from 'react-icons/fi';
import NoResult from 'pages/chat/components/sidebar/no-result';
import { ChatParticipantStatus } from 'ts/enums/chat-participants-status.enum';
import { useRecoilValue } from 'recoil';
import { chatState } from 'ts/states/chat-state';
import MemberInquireItem from 'pages/chat/components/sidebar/member-inquire-item';

const ChatMemberInquireTap = (props: {
	setIsInquireTap: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const chat = useRecoilValue(chatState).chatRoom as ChatRoom;
	const [input, setInput] = useState<string>('');
	const [stableParticipants, setStableParticipants] = useState<
		ChatParticipant[]
	>([]);
	const [searchedParticipant, setSearchedParticipant] = useState<
		ChatParticipant[]
	>([]);

	useEffect(() => {
		setStableParticipants(
			chat.participants
				.filter(
					(participant) =>
						participant.status === ChatParticipantStatus.DEFAULT ||
						participant.status === ChatParticipantStatus.MUTED
				)
				.sort((a, b) => a.user.nickname.localeCompare(b.user.nickname))
		);
	}, [chat]);

	useEffect(() => {
		if (input.length === 0) {
			setSearchedParticipant(stableParticipants);
		} else {
			setSearchedParticipant(
				stableParticipants.filter((participant) =>
					participant.user.nickname.includes(input)
				)
			);
		}
	}, [input, stableParticipants, chat]);

	const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInput(e.target.value);
	};

	const searchInput = () => {
		return (
			<div className='p-4 border-b'>
				<TextInput
					icon={BiSearch}
					value={input}
					placeholder='멤버 찾기'
					onChange={onChangeInput}
				/>
			</div>
		);
	};

	const onClickAddUser = () => {
		props.setIsInquireTap(false);
	};

	const addParticipant = () => {
		return (
			<button
				className='flex items-center w-full py-4 px-6 text-gray-900 hover:bg-gray-200'
				onClick={onClickAddUser}
			>
				<FiUserPlus />
				<div className='ml-3 text-sm font-bold'>사용자 추가</div>
			</button>
		);
	};

	const participantsList = () => {
		const participants = searchedParticipant;

		if (participants.length === 0) {
			return (
				<>
					<div className='pl-5 pt-2 text-xs font-semibold text-gray-600'>
						이 채널에서
					</div>
					<NoResult />
				</>
			);
		}
		return participants.map((participant, id) => (
			<div key={id}>
				<MemberInquireItem participant={participant} />
			</div>
		));
	};

	return (
		<div className='flex flex-col w-full chat-right-sidebar-tap'>
			{searchInput()}
			<div className='overflow-y-auto'>
				{addParticipant()}
				{participantsList()}
			</div>
		</div>
	);
};

export default ChatMemberInquireTap;
