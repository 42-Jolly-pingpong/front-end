import { Navbar } from 'flowbite-react';

const HeaderNavigateBar = () => {
	return (
		<Navbar fluid className='flex items-center p-0 border-gray-400 border-l-2'>
			<Navbar.Collapse>
				<Navbar.Link href='/chat' className='font-bold text-yellow-300'>
					Chats
				</Navbar.Link>
				<Navbar.Link href='#' className='font-bold text-yellow-300'>
					Friends
				</Navbar.Link>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default HeaderNavigateBar;
