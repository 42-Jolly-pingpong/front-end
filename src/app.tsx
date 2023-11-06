import { RecoilRoot } from 'recoil';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Root from 'components/root/root';
import Layout from 'components/layout/layout';
import Chat from 'pages/chat/chat';
import Game from 'pages/game/game';
import SignUp from 'pages/sign-up/sign-up';
import Profile from 'pages/profile/profile';
import Page404 from 'pages/error/page-404';

function App() {
	return (
		<RecoilRoot>
			<BrowserRouter>
				<Routes>
					<Route element={<Layout />}>
						<Route path='/' element={<Root />} index />
						<Route path='/profile/:nickname' element={<Profile />} />
						<Route path='/chat' element={<Chat />} />
						<Route path='/sign-up' element={<SignUp />} />
					</Route>
					<Route path='/game' element={<Game />} />
					<Route path='*' element={<Page404 />} />
				</Routes>
			</BrowserRouter>
		</RecoilRoot>
	);
}

export default App;
