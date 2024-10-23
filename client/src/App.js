import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { Box, AppBar, Toolbar } from '@mui/material';
import Join from './component/Join';
import Feed from './component/Feed';
import Login from './component/Login';
import FileUpload from './component/FileUpload';
import './App.css';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation(); // 현재 경로를 가져옵니다.

  // AppBar가 필요 없는 경로를 배열로 정의합니다.
  const noAppBarPaths = ['/upload'];

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {/* AppBar가 필요 없는 경로인지 확인하여 렌더링합니다. */}
      {!noAppBarPaths.includes(location.pathname) && (
        <AppBar sx={{
          backgroundColor: '#fbf6ef',
          width: '25%', // 원하는 너비 설정
          height: '80vh', // 전체 높이 차지
          left: '24%',
          top: '10%',
          marginRight: '20px'
        }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <img src="./img/mainLogo.png" className="App-logo" alt="logo" style={{ width: '80%', height: '45%', marginRight: '25%', margin: '0 auto' }} />
          </Toolbar>
        </AppBar>
      )}

      {/* /upload 경로일 때는 FileUpload 컴포넌트만 표시합니다. */}
      {location.pathname === '/upload' ? (
        <FileUpload />
      ) : (
        <Box sx={{
          width: '25%',
          height: '80vh',
          right: '20%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: '25%'
        }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/join" element={<Join />} />
            <Route path="/:id" element={<Feed />} />
          </Routes>
        </Box>
      )}
    </Box>
  );
}

export default App;
