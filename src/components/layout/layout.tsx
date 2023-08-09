import { Outlet } from 'react-router';
import Header from './header/header';
import Footer from './footer';

const Layout = () => {
	return (
		<div className='flex flex-col h-screen'>
			<Header />
			<div className='flex-1'>
				<Outlet />
			</div>
			<Footer />
		</div>
	);
};

export default Layout;
