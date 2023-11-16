import { BsMailbox } from 'react-icons/bs';
import { useRecoilValue } from 'recoil';
import User from 'ts/interfaces/user.model';
import { chatSidebarState } from 'ts/states/chat-sidebar-state';

const ContactField = () => {
	const otherUser = useRecoilValue(chatSidebarState).profile as User;

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

export default ContactField;
