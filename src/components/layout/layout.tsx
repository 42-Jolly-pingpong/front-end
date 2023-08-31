import { Outlet } from 'react-router';
import Footer from 'components/layout/footer/footer';
import Header from 'components/layout/header/header';

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
