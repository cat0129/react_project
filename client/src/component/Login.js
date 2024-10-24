import React, { useEffect, useRef } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const idRef = useRef();
  const pwdRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    idRef.current.focus();
  }, []);

  async function fnLogin() {
    const id = idRef.current.value;
    const pwd = pwdRef.current.value;
    try {
      const res = await axios.post("http://localhost:3100/user",
        {
          id: id,
          pwd: pwd
        });
      if (res.data.success) {
        const id = res.data.id;
        localStorage.setItem('userId', id);
        navigate(`/feed/${id}`);
        alert("로그인성공");
      } else {
        alert("아이디/비밀번호 다시 확인");
      }
    } catch (err) {
      console.log("오류 발생");
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // 세로로 화면 전체를 차지함
        backgroundColor: '#fbf6ef',
      }}
    >
      <Box
        sx={{
          backgroundColor: '#ffffff', // 내부 박스의 배경색
          width: '350px', // 고정된 너비
          height: '60vh', // 화면 전체 높이
          padding: '20px',
          borderRadius: '8px', // 모서리를 둥글게
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Typography variant="h4" mb={3} align="center">
          로그인
        </Typography>
        <TextField inputRef={idRef} label="아이디" variant="outlined" fullWidth margin="normal" />
        <TextField inputRef={pwdRef} label="비밀번호" variant="outlined" type="password" fullWidth margin="normal" />
        <Button onClick={fnLogin} variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          로그인
        </Button>
        <Typography mt={2} align="center">
          계정이 없으신가요? <a href="/join">회원가입</a>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
