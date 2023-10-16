import { Banner, Button, Progress } from 'flowbite-react';
import { HiX } from 'react-icons/hi';
import AlertLogo from 'images/alarm-icon.jpg';

const NoMatchBanner = () => {
	return (
		<>
			{' '}
			<Banner>
				<div className='fixed w-full flex top-0 left-0 z-50 justify-between p-4 border rounded border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 bg-white'>
					<div className='flex flex-row items-center '>
						<div className='max-w-full mr-2'>
							<img src={AlertLogo} />
						</div>
						<div className='text-gray-500'>
							yujelee 님이 게임 요청을 보냈어요!
						</div>
						<Button />
						<Progress progress={50} />
					</div>
					<Banner.CollapseButton
						color='gray'
						className='border-0 bg-transparent px-0'
					>
						<HiX className='h-4 w-4' />
					</Banner.CollapseButton>
				</div>
			</Banner>
		</>
	);
};

export default NoMatchBanner;
