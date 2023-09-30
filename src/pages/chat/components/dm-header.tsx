import { Button } from 'flowbite-react';
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
		<div className=''>
			<div className='ml-5 place-self-end'>
				<div className='flex items-center'>
					<div className='w-36 h-36 overflow-hidden'>
						<img
							src={mate.avatarPath}
							className='object-cover w-full h-full rounded-md'
						/>
					</div>
					<div className='mx-2 font-bold'>{mate.nickname}</div>
					{status()}
				</div>
				<div className='my-3'>
					이 대화는 나와 @{mate.nickname}님 간의 대화입니다. 상대방에 대해
					자세히 알아보려면 프로필을 확인하세요.
				</div>
				<Button color='light' className='font-bold'>
					프로필 보기
				</Button>
			</div>
		</div>
	);
};

export default DmHeader;
