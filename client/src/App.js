import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Button } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Join from './component/Join';
import Feed from './component/Feed';
import Login from './component/Login';
import Logout from './component/Logout';
import Main from './component/Main';
import Info from './component/Info';
import FileUpload from './component/FileUpload';
import Search from './component/Search';
import './App.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#fbf6ef', // 기본 배경색
          color: 'black', // 기본 글자 색상
          '&:hover': {
            backgroundColor: '#e3d1c8', // 호버 시 색상
          },
          borderRadius: '8px', // 버튼 모서리 둥글게
        },
        contained: {
          boxShadow: 'none', // 그림자 제거
        },
      },
    },
  },
});

function App(){
  return (
    <ThemeProvider theme={theme}> {/* ThemeProvider로 테마 적용 */}
      <CssBaseline /> {/* 기본 CSS 리셋 */}
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/join" element={<Join />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/feed/:id" element={<Feed />} />
          <Route path="/upload" element={<FileUpload />} />
          <Route path="/info/:id" element={<Info />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;