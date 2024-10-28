import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

function Logout() {
  const navigate = useNavigate();

  const fnLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    navigate('/'); // 로그인 페이지로 리디렉션
    alert("로그아웃 성공");
  };

  return (
    <Button onClick={fnLogout} variant="contained" color="secondary">
      로그아웃
    </Button>
  );
}

export default Logout;
