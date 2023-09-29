import { Sidebar } from 'flowbite-react';
import { BiPlus } from 'react-icons/bi';

const CreateDm = () => {
	return (
		<Sidebar.Item>
			<div className='flex items-center'>
				<BiPlus className='mr-1' />
				<div>대화상대 추가</div>
			</div>
		</Sidebar.Item>
	);
};

export default CreateDm;
