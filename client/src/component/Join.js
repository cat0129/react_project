import React, { useRef } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Join() {
  const idRef = useRef();
  const pwdRef = useRef();
  const phoneRef = useRef();
  const navigate = useNavigate();

  async function fnJoin(){
    const id = idRef.current.value;
    const pwd = pwdRef.current.value;
    const phone = phoneRef.current.value;
    if(!id || !pwd ||!phone){
      alert("빈값을 채워주세요");
      return;
    }
    try {
      const res = await axios.post("http://localhost:3100/user/insert", {
        id, pwd, phone
      }); 

      if(res.data.success){
        navigate("/login");
      } else {
        alert("회원가입 실패!");
      }


    } catch (error) {
      console.log("서버 호출 중 오류 발생");
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
          회원가입
        </Typography>
        <TextField inputRef={idRef} label="아이디" variant="outlined" fullWidth margin="normal" />
        <TextField inputRef={pwdRef} label="비밀번호" variant="outlined" type="password" fullWidth margin="normal" />
        <TextField inputRef={phoneRef} label="전화번호" variant="outlined" type="password" fullWidth margin="normal" />
        <Button onClick={fnJoin} variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          회원가입
        </Button>
        <Typography mt={2} align="center">
          이미 계정이 있으신가요? <a href="/login">로그인</a>
        </Typography>
      </Box>
    </Box>
  );
};

export default Join;
