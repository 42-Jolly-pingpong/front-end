import { Card } from 'flowbite-react';

const FriendSidebar = () => {
	return (
		<>
			<Card className='fixed flex flex-col right-0 friend-sidebar'>
				<div className='flex h-1 top-0 justify-between'>
					<div>친구목록 </div>
					<div>x표시</div>
				</div>
				<div>멤버찾기</div>
				<div>친구목록</div>
			</Card>
		</>
	);
};

export default FriendSidebar;
