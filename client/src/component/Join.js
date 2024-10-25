import React, { useRef, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Join() {
  const idRef = useRef();
  const pwdRef = useRef();
  const phoneRef = useRef();
  const profileImgRef = useRef();
  const [imgSrc, setImgSrc] = useState(null); // 이미지 미리보기 상태
  const navigate = useNavigate();

  async function fnJoin() {
    const id = idRef.current.value;
    const pwd = pwdRef.current.value;
    const phone = phoneRef.current.value;

    if (!id || !pwd || !phone) {
      alert("모든 항목을 채워주세요");
      return;
    }

    // FormData 생성
    const formData = new FormData();
    formData.append('id', id);
    formData.append('pwd', pwd);
    formData.append('phone', phone);

    // 프로필 이미지가 선택된 경우 추가
    if (profileImgRef.current.files[0]) {
      formData.append('profileImg', profileImgRef.current.files[0]);
    }

    try {
      const res = await axios.post("http://localhost:3100/user/insert", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.data.success) {
        navigate("/login");
      } else {
        alert("회원가입 실패!");
      }
    } catch (error) {
      console.log("서버 호출 중 오류 발생", error);
    }
  }

  // 이미지 미리보기 핸들러
  const handleImagePreview = () => {
    const file = profileImgRef.current.files[0];
    if (file) {
      setImgSrc(URL.createObjectURL(file));
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#fbf6ef',
      }}
    >
      <Box
        sx={{
          backgroundColor: '#ffffff',
          width: '350px',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h4" mb={3} align="center">
          회원가입
        </Typography>
        <TextField inputRef={idRef} label="아이디" variant="outlined" fullWidth margin="normal" />
        <TextField inputRef={pwdRef} label="비밀번호" variant="outlined" type="password" fullWidth margin="normal" />
        <TextField  sx={{ marginBottom: '20px' }} inputRef={phoneRef} label="전화번호" variant="outlined" type="tel" fullWidth margin="normal" />
        
        {/* 프로필 사진 입력 필드 */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            marginBottom: '0px',
          }}
        >
          <Button className="button-custom"
            component="label"
            fullWidth
            sx={{
              padding: '10px',
            }}
          >
            프로필 사진 선택
            <input
              type="file"
              ref={profileImgRef}
              onChange={handleImagePreview}
              hidden
            />
          </Button>
        </Box>

        {/* 이미지 미리보기 */}
        {imgSrc && (
          <Box
            sx={{
              width: '100%',
              marginBottom: '16px',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <img src={imgSrc} alt="미리보기" style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }} />
          </Box>
        )}

        <Button className="button-custom" onClick={fnJoin} fullWidth sx={{ mt: 2 }}>
          회원가입
        </Button>
        <Typography mt={2} align="center">
          이미 계정이 있으신가요? <a href="/login">로그인</a>
        </Typography>
      </Box>
    </Box>
  );
}

export default Join;
