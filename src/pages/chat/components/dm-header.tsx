import { Button } from 'flowbite-react';
import UserImg from 'pages/chat/components/user-img';
import { User } from 'ts/interfaces/user.model';

const DmHeader = (props: { mate: User }) => {
	const { mate } = props;

	const status = () => {
		return <div className='flex w-2 h-2 bg-green-400 rounded-full'></div>; //online
		// return (
		// 	<div className='flex w-3 h-3 border-2 border-gray-400 rounded-full'></div> //offline
		// );
	};

	return (
		<div className='my-5'>
			<div className='flex items-center'>
				<UserImg src={mate.avatarPath} size={36} />
				<div className='mx-2 font-bold'>{mate.nickname}</div>
				{status()}
			</div>
			<div className='my-3'>
				이 대화는 나와 @{mate.nickname}님 간의 대화입니다. 상대방에 대해 자세히
				알아보려면 프로필을 확인하세요.
			</div>
			<Button color='light' className='font-bold'>
				프로필 보기
			</Button>
		</div>
	);
};

export default DmHeader;
