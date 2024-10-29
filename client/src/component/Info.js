import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import Menu from './Menu';

const Info = () => {
    const userId = localStorage.getItem('userId');
    const [user, setUser] = useState({});
    const [image, setImage] = useState([]); // 선택한 파일들
    const [imagePreview, setImagePreview] = useState(''); // 미리보기 이미지 URL
    const [isEditing, setIsEditing] = useState(false); // 수정 상태 관리
    const phoneRef = useRef(); // phoneRef 정의

    const imageChange = (e) => {
        const file = Array.from(e.target.files);
        setImage(file);

        // 첫 번째 선택된 이미지의 URL을 생성하여 미리보기 상태에 저장
        if (file.length > 0) {
            const imageURL = URL.createObjectURL(file[0]);
            setImagePreview(imageURL);
        }
    };

    async function getInfo(userId) {
        try {
            const res = await axios.get(`http://localhost:3100/user/${userId}`);
            if (res.data.success) {
                const userInfo = res.data.userInfo; 
                setUser(userInfo); // 사용자 정보를 상태에 설정
                setImagePreview(`http://localhost:3100/${userInfo.profile_img_path}`); // 초기 프로필 이미지 미리보기
            }
        } catch (err) {
            console.log("오류 발생");
        }
    }

    const fnUpdate = async (userId) => {
        const formData = new FormData();
        
        const updatedPhone = phoneRef.current.value;
        formData.append('phone', updatedPhone);

        image.forEach((img) => {
            formData.append('profileImg', img); 
        });

        try {
            const res = await axios.put(`http://localhost:3100/user/${userId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (res.data.success) {
                getInfo(userId);
                setIsEditing(false);
            }
        } catch (err) {
            console.log("정보 수정 실패", err);
        }
    }

    async function fnDelete(){
        try{
            const res = await axios.delete(`http://localhost:3100/user/${userId}`)
            if(res.data.success){
                localStorage.removeItem('userId');
                window.location.href="http://localhost:3000/"
                setIsEditing(false);
            }
        } catch (err) {
            console.log("회원 탈퇴 실패", err);
        }

    }

    useEffect(() => {
        getInfo(userId); // 컴포넌트 마운트 시 정보 가져오기
    }, [userId]);

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}> {/* 전체 높이 설정 */}
            <Menu />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1, // 남은 공간을 차지하도록 설정
                    padding: '20px',
                }}
            >
                <Typography variant="h5" gutterBottom>프로필</Typography>
                <img 
                    src={imagePreview || `http://localhost:3100/${user.profile_img_path}`} 
                    alt="Profile" 
                    style={{ width: '300px', height: '300px', margin: '10px 0' }} 
                />
                <Button onClick={() => setIsEditing(true)} variant="contained" sx={{ marginBottom: '10px' }}>프로필 수정</Button>
    
                {isEditing && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <input type="file" onChange={imageChange} style={{ marginBottom: '10px' }} />
                        <TextField label="전화번호 변경" inputRef={phoneRef} defaultValue={user.phone} style={{ marginBottom: '10px' }} />
                        <Box sx={{ display: 'flex', gap: '10px' }}>
                            <Button onClick={() => fnUpdate(userId)} variant="contained">수정</Button>
                            <Button onClick={() => setIsEditing(false)} variant="outlined">취소</Button>
                            <Button onClick={fnDelete}>회원 탈퇴</Button>
                        </Box>
                    </Box>
                )}
            </Box>
        </Box>
    );   
}
export default Info;
