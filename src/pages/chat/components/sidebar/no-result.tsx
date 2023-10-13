import { FiUser } from 'react-icons/fi';

const NoResult = () => {
	return (
		<div className='px-5'>
			<div className='mt-2 flex items-center'>
				<div className='flex items-center justify-center w-8 h-8 bg-gray-100 rounded-md'>
					<FiUser size='16' />
				</div>
				<div className='ml-2 text-sm font-bold text-gray-500'>
					일치하는 항목 없음
				</div>
			</div>
		</div>
	);
};

export default NoResult;
