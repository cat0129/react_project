import React, { useState } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; // 슬라이드 스타일
import 'slick-carousel/slick/slick-theme.css'; // 슬라이드 테마

const FileUpload = () => {
    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);

    const imageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);

        const previews = files.map((file) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            return new Promise((resolve) => {
                reader.onload = () => resolve(reader.result);
            });
        });

        Promise.all(previews).then((images) => setPreviewImages(images));
    };

    const fnUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('content', content);
        images.forEach((image) => {
            formData.append('images', image);
        });

        try {
            const response = await axios.post('http://localhost:3100/feed', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert(response.data.message);
        } catch (error) {
            console.error('피드 등록 오류:', error);
        }
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <Box sx={{
            backgroundColor: '#fbf6ef',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80vh', // 전체 높이 사용
            margin: '0 auto' // 가운데 정렬
        }}>
            {/* 이미지 미리보기 박스 */}
            <Box sx={{
                width: '400px', // 박스 너비 조정
                height: '80%', // 높이 조정
                margin: '0 20px', // 양쪽 여백 추가
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                overflow: 'hidden' // 슬라이드가 박스를 넘어가지 않도록 설정
            }}>
                {previewImages.length > 0 && (
                    <Slider {...settings} style={{ width: '100%' }}>
                        {previewImages.map((imgSrc, index) => (
                            <div key={index}>
                                <img
                                    src={imgSrc}
                                    alt={`preview-${index}`}
                                    style={{ width: '100%', height: 'auto' }}
                                />
                            </div>
                        ))}
                    </Slider>
                )}
            </Box>

            {/* 텍스트 영역 및 버튼 박스 */}
            <Box sx={{
                width: '400px', // 박스 너비 조정
                height: '80%', // 높이 조정
                margin: '0 20px', // 양쪽 여백 추가
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px', // 내부 여백 추가
            }}>
                <form onSubmit={fnUpload} style={{ width: '100%' }}>
                    <div>
                        <label>내용:</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            style={{ width: '100%', height: '40vh' }} // 텍스트 영역 높이 설정
                        />
                    </div>
                    <div>
                        <label>이미지 첨부:</label>
                        <input type="file" multiple onChange={imageChange} />
                    </div>
                    <button type="submit" style={{ marginTop: '10px' }}>등록</button>
                </form>
            </Box>
        </Box>
    );
};

export default FileUpload;
