import Layout from 'components/layout/layout';
import Root from 'components/root/root';
import Sidebar from 'components/sidebar/sidebar';
import Snackbar from 'components/snackbar/snackbar';
import UserInfo from 'components/user-info/user-info';
import CreateChat from 'pages/create-chat/create-chat';
import ManageChat from 'pages/manage-chat/manage-chat';
import Profile from 'pages/profile/profile';
import SignUp from 'pages/sign-up/sign-up';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { sidebarSelector } from 'ts/states/sidebar-state';

const Section = (props: { section: JSX.Element }) => {
	const sidebarState = useRecoilValue(sidebarSelector);

	return (
		<div className='flex w-full h-full'>
			<div className='flex flex-col flex-grow justify-center items-center'>
				{props.section}
			</div>
			{sidebarState ? <Sidebar /> : null}
			<Snackbar />
		</div>
	);
}; //임시

function App() {
	return (
		<div>
			<RecoilRoot>
				<BrowserRouter>
					<Routes>
						<Route element={<Layout />}>
							<Route index path='/' element={<Root />} />
							<Route path='/game' element={<h1>GAME</h1>} />
							<Route
								path='/profile/:user_idx'
								element={<Section section={<Profile />} />}
							/>
							<Route path='/sign-up' element={<SignUp />} />
							<Route
								path='/chat-rooms'
								element={<Section section={<CreateChat />} />}
							/>
							<Route
								path='/users/:user_idx/chat-rooms/:room_idx'
								element={<Section section={<ManageChat />} />}
							/>
							<Route
								path='/user-info/:nickname'
								element={<Section section={<UserInfo />} />}
							/>
						</Route>
						<Route path='/login' element={<h1>LOGIN</h1>} />
						<Route path='*' element={<h1>NOT FOUND</h1>} />
					</Routes>
				</BrowserRouter>
			</RecoilRoot>
		</div>
	);
}

export default App;
