import { HiX } from 'react-icons/hi';
import { useRecoilState } from 'recoil';
import { friendSidebarState } from 'ts/states/friend/friend-sidebar-state';

const FriendSidebarHeader = () => {
	const [sidebarState, setSidebarState] = useRecoilState(friendSidebarState);
	const handleCancel = () => {
		setSidebarState(!sidebarState);
	};

	return (
		<div className='flex justify-between items-center w-full h-12 border-b pb-2'>
			<div className='text-lg font-bold'>친구 목록</div>
			<HiX onClick={handleCancel} className='h-6 w-6 cursor-pointer ml-4' />
		</div>
	);
};

export default FriendSidebarHeader;
