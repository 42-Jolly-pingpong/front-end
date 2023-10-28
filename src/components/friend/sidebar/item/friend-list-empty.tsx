import { HiOutlineUserCircle } from 'react-icons/hi2';

const FriendListEmpty = () => {
	return (
		<div className='flex flex-col justify-center items-center h-full'>
			<HiOutlineUserCircle size='72' />
			<div className='text-3xl font-extrabold py-6'>친구 목록이 비었습니다</div>
			<div className='text-sm pb-20'>
				누군가를 친구로 추가하면 여기에 표시됩니다.
			</div>
		</div>
	);
};

export default FriendListEmpty;
