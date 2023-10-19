import { Button, Dropdown } from 'flowbite-react';
import ChatSidebarHeader from 'pages/chat/components/sidebar/chat-sidebar-header';
import UserImg from 'pages/chat/components/user-img';
import { RiMessage2Line } from 'react-icons/ri';
import { MdOutlineRocketLaunch } from 'react-icons/md';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { HiOutlineUserAdd, HiOutlineUserRemove } from 'react-icons/hi';
import { BsMailbox } from 'react-icons/bs';
import { chatSidebarState } from 'ts/states/chat-sidebar-state';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import HistoryDoughnutChart from 'pages/chat/components/sidebar/history-doughnut-chart';
import { Dm } from 'ts/interfaces/dm.model';
import useFetch from 'hooks/use-fetch';
import useChangeChat from 'hooks/use-change-chat';
import { chatListSelector, chatListState } from 'ts/states/chat-list.state';
import userData from 'ts/mock/user-data';

const ChatSidebarProfile = () => {
	const otherUser = useRecoilValue(chatSidebarState).profile;
	const dmList = useRecoilValue(chatListSelector).dmList;
	const setChat = useChangeChat();
	const setDmList = useSetRecoilState(chatListState);
	const getData = useFetch();

	const user = userData[0]; //temp

	if (otherUser === null) {
		return null;
	}

	const status = () => {
		return (
			<div className='flex items-center mx-2 my-2'>
				<div className='flex w-2 h-2 bg-green-400 rounded-full mr-3 text-sm font-normal'></div>
				온라인
			</div>
		); //online

		// return (
		// 	<div className='flex items-center mx-2 my-2'>
		// 		<div className='flex w-3 h-3 border border-gray-400 rounded-full mr-3 text-sm font-normal'></div>
		// 		자리 비움
		// 	</div> //offline
		// );
	}; //temp

	const button = (
		icon: JSX.Element,
		label: string,
		onClickEvent: React.MouseEventHandler<HTMLButtonElement>
	) => {
		return (
			<div className='mr-2.5 mb-4'>
				<Button
					color='light'
					size='sm'
					onClick={onClickEvent}
					disabled={user.id === otherUser.id}
				>
					<div className='flex items-center font-normal text-gray-600'>
						{icon}
						<div className='ml-2 text-xs font-medium'>{label}</div>
					</div>
				</Button>
			</div>
		);
	};

	const renderTrigger = () => {
		return (
			<div>
				<button
					disabled={user.id === otherUser.id}
					className='disabled:cursor-not-allowed disabled:opacity-50 rounded-lg flex items-stretch items-center justify-center p-2 text-center text-gray-900 bg-white border border-gray-300 enabled:hover:bg-gray-100 focus:ring-4 focus:ring-cyan-300 '
				>
					<BiDotsVerticalRounded size={16} />
				</button>
			</div>
		);
	};

	const dotsButton = () => {
		return (
			<Dropdown
				label=''
				dismissOnClick={false}
				renderTrigger={() => renderTrigger()}
			>
				<Dropdown.Item>
					<div className='flex items-center font-normal text-sm text-gray-700'>
						<HiOutlineUserAdd className='mr-2' />
						친구 신청
					</div>
				</Dropdown.Item>
				<Dropdown.Item>
					<div className='flex items-center font-normal text-sm text-red-500'>
						<HiOutlineUserRemove className='mr-2' />
						차단하기
					</div>
				</Dropdown.Item>
			</Dropdown>
		);
	};

	const createNewDm = async () => {
		await getData('POST', '/chat-rooms/dm', { chatMate: otherUser })
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
				throw Error(res.statusText);
			})
			.then((data: Dm) => {
				setDmList((pre) => ({
					...pre,
					dmList: [...pre.dmList, data],
				}));
				setChat(data, false);
			})
			.catch((err) => console.log('create new Dm', err));
	};

	const onClickFriend = () => {
		const dm = dmList.find((dm) => dm.chatMate.id === otherUser.id);
		if (dm) {
			setChat(dm, false);
			return;
		}
		createNewDm();
	};

	const profileField = () => {
		return (
			<div className='my-4 border-b'>
				<div className='mx-4'>
					<div className='font-bold text-xl'>{otherUser.nickname}</div>
					{status()}
					<div className='flex'>
						{button(<RiMessage2Line size='12' />, '메시지', onClickFriend)}
						{button(<MdOutlineRocketLaunch size='12' />, '게임 신청', () => {})}
						{dotsButton()}
					</div>
				</div>
			</div>
		);
	};

	const contactField = () => {
		return (
			<div className='my-4 border-b'>
				<div className='mx-4'>
					<div className='font-bold text-sm'>연락처 정보</div>
					<div className='flex items-center my-4'>
						<div className='flex items-center justify-center rounded-lg w-8 h-8 bg-gray-100 mr-2'>
							<BsMailbox color='#888' size='20' />
						</div>
						<div>
							<div className='text-gray-500 font-bold text-xs'>이메일 주소</div>
							<div className='text-blue-400 font-normal text-xs'>
								{otherUser.email}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	};

	const historyField = () => {
		return (
			<div className='my-4'>
				<div className='mx-4'>
					<div className='font-bold text-sm'>전적 정보</div>
					<HistoryDoughnutChart
						winCount={otherUser.winCount}
						loseCount={otherUser.loseCount}
					/>
				</div>
			</div>
		);
	};

	return (
		<div className='h-hull w-full'>
			<ChatSidebarHeader title='프로필' />
			<div className='grow'>
				<div className='flex justify-center my-3'>
					<UserImg src={otherUser.avatarPath} size='64' />
				</div>
				{profileField()}
				{contactField()}
				{historyField()}
			</div>
		</div>
	);
};

export default ChatSidebarProfile;
