import { Sidebar } from 'flowbite-react';
import { BiPlus } from 'react-icons/bi';

const CreateChannel = () => {
	return (
		<Sidebar.Item>
			<div className='flex items-center'>
				<BiPlus className='mr-1' />
				<div>채널 추가</div>
			</div>
		</Sidebar.Item>
	);
};

export default CreateChannel;
