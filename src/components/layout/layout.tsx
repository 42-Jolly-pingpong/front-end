import { Outlet } from 'react-router';
import Header from 'components/layout/header/header';

const Layout = () => {
	return (
		<div className='flex flex-col h-screen'>
			<Header />
			<Outlet />
		</div>
	);
};

export default Layout;
