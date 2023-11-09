import { Avatar, Button } from 'flowbite-react';
import useChangeSidebar from 'hooks/use-change-sidebar';
import Status from 'pages/chat/components/status';
import User from 'ts/interfaces/user.model';

const DmHeader = (props: { mate: User }) => {
	const { mate } = props;
	const setChatSidebar = useChangeSidebar('profile');

	const onClickProfile = () => {
		setChatSidebar(mate as User);
	};

	return (
		<div className='my-5'>
			<div className='flex items-center'>
				<Avatar img={mate.avatarPath} size='xl' />
				<div className='mx-2 font-bold text-sm'>{mate.nickname}</div>
				<Status status={mate.status} />
			</div>
			<div className='my-3 text-sm font-normal'>
				이 대화는 나와 @{mate.nickname}님 간의 대화입니다. 상대방에 대해 자세히
				알아보려면 프로필을 확인하세요.
			</div>
			<Button
				color='light'
				className='text-xs font-bold text-gray-800'
				onClick={onClickProfile}
			>
				프로필 보기
			</Button>
		</div>
	);
};

export default DmHeader;
