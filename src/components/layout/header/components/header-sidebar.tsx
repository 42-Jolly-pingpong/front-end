import { Button } from 'flowbite-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import FriendsModal from './friends-modal';

const HeaderSidebar = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<>
			<Link to='/chat'>
				<Button
					color='gray'
					className=' border-none font-bold text-yellow-300 border-none:hover enabled:hover:bg-white focus:ring-0 focus:ring-white'
				>
					Chats
				</Button>
			</Link>
			<Button
				color='gray'
				className=' border-none font-bold text-yellow-300 border-none:hover enabled:hover:bg-white focus:ring-0 focus:ring-white'
				onClick={() => setIsModalOpen(true)}
			>
				Friends
			</Button>

			<FriendsModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
			/>
		</>
	);
};

export default HeaderSidebar;
