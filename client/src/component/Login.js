import React, { useEffect, useRef } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const idRef = useRef();
  const pwdRef = useRef();
  const navigate = useNavigate();

  useEffect(()=>{
    idRef.current.focus();
  }, []);

  async function fnLogin(){
    // 로그인 버튼 누르면
    // fnLogin 함수에서 콘솔로 입력한 이메일, 비밀번호 출력
    // console.log(emailRef.current.value);
    // console.log(pwdRef.current.value);
    try{
      const res = await axios.post("http://localhost:3100/login", 
        { id : idRef.current.value,
          pwd : pwdRef.current.value
        });
        if(res.data.success){
          navigate("/main");
        } else {
          alert("아이디/비밀번호 다시 확인");
        }       
    } catch(err){
      console.log("오류 발생");
    }
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      sx={{ backgroundColor: '#f0f4f8', padding: 3 }}
    >
      <Box 
        sx={{ 
          width: '100%', 
          maxWidth: '400px', 
          padding: '20px',  
          backgroundColor: '#fff', 
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',  
          borderRadius: '8px' 
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
