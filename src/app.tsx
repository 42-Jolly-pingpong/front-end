import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/layout';
import { Dispatch, SetStateAction, useState } from 'react';
import Sidebar from './components/sidebar/sidebar';
import Home from './home';

export type SidebarProps = {
	state: number;
	setState: Dispatch<SetStateAction<number>>;
}

const Section = (props : {sidebarState: number, setSidebarState: Dispatch<SetStateAction<number>>, section: JSX.Element}) => {
  const { sidebarState, setSidebarState, section } = props;

  if (sidebarState === 0){
    return (
      <div className="flex">
          <div>
            {section}
          </div>
      </div>
    );
  }
  return (
    <div className="flex">
      <div className="w-2/3 h-1">
        {section}
      </div>
      <div className="w-1/3 h-1">
        {sidebarState === 0? null : <Sidebar state={sidebarState} setState={setSidebarState} />}
      </div>
    </div>
  );
}

function App() {
  const [sidebarState, setSidebarState] = useState<number>(0);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout state={sidebarState} setState={setSidebarState}/>}>
            <Route path="/" element={<Section sidebarState={sidebarState} setSidebarState={setSidebarState} section={<Home />} />} />
            <Route path="/game" element={<h1>GAME</h1>} />
            <Route path="/profile" element={<h1>GAME</h1>} />
          </Route>
          <Route path='/login' element={<h1>LOGIN</h1>} />
          <Route path='/sign-up' element={<h1>SIGN-UP</h1>} />
          <Route path='*' element={<h1>NOT FOUND</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
