import { Outlet } from 'react-router';
import Footer from './footer';
import Header from './header';

const Layout = () => {
	return (
		<div className="flex flex-col h-screen">
			<Header />
			<div className="flex-1">
				<Outlet />
			</div>
			<Footer />
		</div>
	);
};

export default Layout;
