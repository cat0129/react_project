import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box, CssBaseline, AppBar, Toolbar, Typography } from '@mui/material';
import logo from './logo.svg';
import Join from './component/Join';
import Main from './component/Main';
import Login from './component/Login';
import './App.css';

function App() {
  return (
    <Router>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <img src="./img/mainLogo.png" className="App-logo" alt="logo" style={{ width: '400px', marginRight: '10px' }} />
          <Typography variant="h6">Seize the Moment</Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ padding: 3 }}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/feed" element={<Main />} /> {/* /feed 경로 설정 */}
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
