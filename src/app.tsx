import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/layout';
import Profile from './pages/profile/profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<h1>HOME</h1>} />
          <Route path='/game' element={<h1>GAME</h1>} />
          <Route path='/profile/:user_idx' element={<Profile />} />
        </Route>

        <Route path='/login' element={<h1>LOGIN</h1>} />
        <Route path='/sign-up' element={<h1>SIGN-UP</h1>} />
        <Route path='*' element={<h1>NOT FOUND</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
