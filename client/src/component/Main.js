import React from 'react';
import axios from 'axios';
import { Box, AppBar, Toolbar} from '@mui/material';

const Main = ()=>{ 
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
              <AppBar sx={{
                backgroundColor: '#fbf6ef',
                width: '450px', // 너비 조정
                height: '80vh', // 높이 조정
                top: '10%', // 화면 상단에서 10% 지점
                right: '40%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                  <a href='/login'><img src="./img/mainLogo.png" className="App-logo" alt="logo" style={{ width: '95%', height: '45%' }} /></a>
                </Toolbar>
              </AppBar>
        </Box>
  );
};

export default Main;
