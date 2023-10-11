import Layout from 'components/layout/layout';
import Root from 'components/root/root';
import Snackbar from 'components/snackbar/snackbar';
import Chat from 'pages/chat/chat';
import Profile from 'pages/profile/profile';
import SignUp from 'pages/sign-up/sign-up';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

const Section = (props: { section: JSX.Element }) => {
	return (
		<div className='flex w-full h-full'>
			<div className='flex flex-col flex-grow justify-center items-center'>
				{props.section}
			</div>
			<Snackbar />
		</div>
	);
}; //임시

//			{sidebarState ? <Sidebar /> : null}
<Snackbar />;
function App() {
	return (
		<div>
			<RecoilRoot>
				<BrowserRouter>
					<Routes>
						<Route element={<Layout />}>
							<Route path='/' element={<Root />} index />
							<Route path='/game' element={<h1>GAME</h1>} />
							<Route path='/profile/:user_idx' element={<Profile />} />
							<Route path='/chat' element={<Chat />} />
							<Route path='/sign-up' element={<SignUp />} />
						</Route>
						<Route path='*' element={<h1>NOT FOUND</h1>} />
					</Routes>
				</BrowserRouter>
			</RecoilRoot>
		</div>
	);
}

export default App;
