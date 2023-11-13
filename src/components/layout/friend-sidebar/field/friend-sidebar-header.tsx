import { HiX } from 'react-icons/hi';
import { useRecoilState } from 'recoil';
import { friendSidebarState } from 'ts/states/friend/friend-sidebar-state';

const FriendSidebarHeader = () => {
	const [sidebarState, setSidebarState] = useRecoilState(friendSidebarState);
	const handleCancel = () => {
		setSidebarState(!sidebarState);
	};

	return (
		<div className='flex h-12 border-b'>
			<div className='flex justify-between items-center w-full mx-4'>
				<div className='text-lg font-bold'>친구 목록</div>
				<HiX
					onClick={handleCancel}
					className='h-7 w-7 cursor-pointer text-gray-800'
				/>
			</div>
		</div>
	);
};

export default FriendSidebarHeader;
