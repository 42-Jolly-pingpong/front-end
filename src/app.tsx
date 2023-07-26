import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/layout';
import Header from './components/layout/header';
import Footer from './components/layout/footer';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="game" element={<h1>GAME</h1>} />
          <Route path="profile" element={<h1>GAME</h1>} />
        </Route>

        <Route path='/login' element={<h1>LOGIN</h1>} />
        <Route path='/sign-up' element={<h1>SIGN-UP</h1>} />
        <Route path='*' element={<h1>NOT FOUND</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
