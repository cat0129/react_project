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
