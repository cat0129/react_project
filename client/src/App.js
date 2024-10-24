import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import Join from './component/Join';
import Feed from './component/Feed';
import Login from './component/Login';
import Main from './component/Main';
import FileUpload from './component/FileUpload';
import './App.css';

function App(){
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/feed/:id" element={<Feed />} />
        <Route path="/upload" element={<FileUpload />} />
      </Routes>
    </Router>
  )
}

export default App;