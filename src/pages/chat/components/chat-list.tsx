import Logo from 'components/logo/logo';
import { Flowbite, Sidebar } from 'flowbite-react';
import Channels from 'pages/chat/components/sidebar/channels';
import Dms from 'pages/chat/components/sidebar/dms';
import { sidebarTheme } from 'pages/chat/themes/side-bar-theme';

const ChatList = () => {
	return (
		<div className='h-screen w-60 border-r'>
			<div className='border-b'>
				<Logo />
				<div className='sidebar'>
					<Flowbite theme={{ theme: sidebarTheme }}>
						<Sidebar className='w-full'>
							<Sidebar.ItemGroup>
								<Channels />
							</Sidebar.ItemGroup>
							<Sidebar.ItemGroup>
								<Dms />
							</Sidebar.ItemGroup>
						</Sidebar>
					</Flowbite>
				</div>
			</div>
		</div>
	);
};

export default ChatList;
