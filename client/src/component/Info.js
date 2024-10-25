import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';

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
        
        // 전화번호 추가
        const updatedPhone = phoneRef.current.value;
        formData.append('phone', updatedPhone);

        // 이미지 추가
        image.forEach((img) => {
            formData.append('profileImg', img); // 각 이미지를 추가
        });

        try {
            const res = await axios.put(`http://localhost:3100/user/${userId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (res.data.success) {
                getInfo(userId); // 업데이트 후 정보 가져오기
                setIsEditing(false); // 수정 모드 종료
            }
        } catch (err) {
            console.log("정보 수정 실패", err);
        }
    };

    useEffect(() => {
        getInfo(userId); // 컴포넌트 마운트 시 정보 가져오기
    }, [userId]);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh', // 화면 세로 중앙 정렬
                padding: '20px', // 패딩 추가
            }}
        >
            <Typography variant="h5" gutterBottom>프로필</Typography>
            <img 
                src={imagePreview || `http://localhost:3100/${user.profile_img_path}`} 
                alt="Profile" 
                style={{ width: '300px', height: '300px', margin: '10px 0' }} 
            /> {/* 사용자 프로필 이미지 */}
            <Button className="button-custom" onClick={() => setIsEditing(true)} variant="contained" sx={{ marginBottom: '10px' }}>프로필 수정</Button> {/* 수정 버튼 */}

            {isEditing && ( // 수정 모드일 때만 표시
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <input type="file" onChange={imageChange} style={{ marginBottom: '10px' }} /> {/* 파일 선택 */}
                    <TextField label="전화번호 변경" inputRef={phoneRef} defaultValue={user.phone} style={{ marginBottom: '10px' }} /> {/* 전화번호 입력 필드 */}
                    
                    {/* 버튼을 나란히 배치하기 위한 박스 */}
                    <Box sx={{ display: 'flex', gap: '10px' }}>
                        <Button className="button-custom" onClick={() => fnUpdate(userId)} variant="contained">수정</Button>
                        <Button className="button-custom" onClick={() => setIsEditing(false)} variant="outlined">취소</Button> {/* 수정 취소 버튼 */}
                    </Box>
                </Box>
            )}
        </Box>
    );
}


export default Info;
