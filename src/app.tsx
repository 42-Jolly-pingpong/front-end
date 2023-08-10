import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/layout';
import Sidebar from './components/sidebar/sidebar';
import Home from './home';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { sidebarSelector } from './ts/state/sidebar-state';
import Profile from './pages/profile/profile';

const Section = (props: { section: JSX.Element }) => {
	const sidebarState = useRecoilValue(sidebarSelector);

	return (
		<div className='flex w-full h-full'>
			<div className='flex flex-col flex-grow justify-center items-center'>
				{props.section}
			</div>
			{sidebarState ? <Sidebar /> : null}
		</div>
	);
}; //임시

function App() {

  return (
    <div>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout/>}>
              <Route path="/" element={<Section section={<Home />} />} />
              <Route path="/game" element={<h1>GAME</h1>} />
              <Route path="/profile/:user_idx" element={<Profile />} />
            </Route>
            <Route path='/login' element={<h1>LOGIN</h1>} />
            <Route path='/sign-up' element={<h1>SIGN-UP</h1>} />
            <Route path='*' element={<h1>NOT FOUND</h1>} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </div>
  );
}

export default App;
