import { Outlet } from 'react-router';
import Footer from './footer';
import Header from './header';
import { SidebarProps } from '../../app';

const Layout = (props: SidebarProps) => {

	const { state, setState } = props;
	return (
		<div className="flex flex-col h-screen">
			<Header />
			<div className="flex-1">
				<Outlet />
			</div>
			<Footer state={state} setState={setState}/>
		</div>
	);
};

export default Layout;
