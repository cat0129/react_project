import React from 'react';
import { Box, Button, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import Logout from './Logout';
import Search from './Search';

const Menu = () => {
    const userId = localStorage.getItem('userId');
    return (
        <Box 
            sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'flex-start', 
                width: '150px', 
                padding: '10px', 
                backgroundColor: '#f0f0f0', 
                height: '80vh' 
            }}
        >
            <Button color="inherit" href="http://localhost:3000/">홈</Button>
            <Button color="inherit" href="http://localhost:3000/search">검색</Button>
            <Button color="inherit">알림</Button>
            <Button color="inherit" href="http://localhost:3000/upload">추가</Button>
            <Logout>로그아웃</Logout>
            {/* 설정 버튼에 userId 적용 */}
            <Button color="inherit" component={Link} to={`/user/${userId}`}>설정</Button>
        </Box>
    );
};

export default Menu;
