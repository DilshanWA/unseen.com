import React from 'react';
import Homepage from './Screens/pages/Home';
import Searchbox from './Screens/pages/searchbox';
import Imags from './Screens/pages/Imags-box';
import ImageDetails from './Screens/pages/ImageDetails'
import ErrorPage404 from './Screens/pages/ErrorPage404'
import { Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/Searchbox' element={<Searchbox />} />
        <Route path='/Imags' element={<Imags />} />
        <Route path='/ImageDetails' element={<ImageDetails/>}/>
        <Route path='/ErrorPage404' element={<ErrorPage404/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
