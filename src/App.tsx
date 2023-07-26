import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<h1>HOME</h1>} />
        <Route path='/game' element={<h1>GAME</h1>} />
        <Route path='/profile' element={<h1>CHAT</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
