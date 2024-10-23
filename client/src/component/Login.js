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
    try {
      const res = await axios.post("http://localhost:3100/user",
        {
          id: idRef.current.value,
          pwd: pwdRef.current.value
        });
      if (res.data.success) {
        navigate("/main");
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
      width="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="97%"
      sx={{
        backgroundColor: '#fbf6ef',
        padding: 2
      }}
    >
      <Box
        sx={{
          width: '80%',
          padding: '5%',
          backgroundColor: 'white',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          margin: '10px'
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
