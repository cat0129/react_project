import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Alert, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Feed = () => {
    const userId = localStorage.getItem('userId');
    const [profileImg, setProfileImg] = useState('');
    const [feed, setFeed] = useState([]);
    const [oneFeed, setOneFeed] = useState(null); // 변경: 단일 피드를 저장할 상태
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false); // 모달 상태
    const token = localStorage.getItem('token');

    async function getFeed() {
        setError(null);
        console.log("!!!!"+userId);
        try {
            const res = await axios.get(`http://localhost:3100/feed/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('Response Data:', res.data);
            if (res.data && res.data.list && res.data.list.length > 0) {
                setFeed(res.data.list);
                setProfileImg(res.data.list[0].profile_img_path);
            } else {
                setError("피드가 없음");
            }
        } catch (err) {
            setError(err.message);
            console.error('Error fetching feed:', err);
        }
    }

    useEffect(() => {
        getFeed();
    }, [userId]);

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        appendDots: (dots) => (
            <div style={{ 
                position: 'absolute', 
                bottom: '-100px',
                left: '50%', 
                transform: 'translateX(-50%)', 
                zIndex: 1 
            }}>
                <ul style={{ margin: '0px' }}> {dots} </ul>
            </div>
        )
    };

    const groupedFeed = feed.reduce((acc, curr) => {
        if (!acc[curr.feed_no]) {
            acc[curr.feed_no] = [];
        }
        acc[curr.feed_no].push(curr);
        return acc;
    }, {});

    const getOneFeed = async (feedNo) => {
        try {
            const res = await axios.get(`http://localhost:3100/feed/${userId}/${feedNo}`, {
                headers: { Authorization: `Bearer ${token}` } // 헤더에 인증 토큰 추가
            });
            if (res.data.success) {
                const fetchedFeed = res.data.result;
                if (fetchedFeed && fetchedFeed.length > 0) {
                    setOneFeed(fetchedFeed[0]);
                    setOpen(true);
                    console.log("불러오기 성공", fetchedFeed[0]);
                } else {
                    console.error("피드를 찾을 수 없습니다.");
                }
            } else {
                console.error("불러오기 실패");
            }
        } catch (err) {
            console.error("API 요청 중 오류 발생:", err);
        }
    };
    
    
    const handleImageClick = (feedNo) => {
        getOneFeed(feedNo); 
    };
    const handleClose = () => {
        setOpen(false); // 모달 닫기
        setOneFeed(null); // 피드 내용 초기화
    };


    const fnDelete = async (feedNo) => {
        if (!window.confirm("삭제하시겠습니까?")) {
            return;
        }
        try {
            const res = await axios.delete(`http://localhost:3100/feed/${userId}/${feedNo}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.data.success) {
                alert("삭제되었습니다");
                getFeed(); // 삭제 후 피드를 새로 고침
                handleClose(); // 모달 닫기
            } else {
                alert("삭제에 실패했습니다.");
            }
        } catch (err) {
            alert("오류발생: " + err.message);
        }
    };
    

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            {/* 세로 툴바 */}
            <Box 
                sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'flex-start', 
                    width: '150px', 
                    padding: '10px', 
                    backgroundColor: '#f0f0f0', 
                    height: '100vh' 
                }}
            >
                <Button color="inherit">홈</Button>
                <Button color="inherit">검색</Button>
                <Button color="inherit">알림</Button>
                <Button color="inherit" href="http://localhost:3000/upload">추가</Button>
                <Button color="inherit">설정</Button>
            </Box>

            {/* 메인 피드 영역 */}
            <Box sx={{ 
                flexGrow: 1, 
                padding: '20px', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', // 중앙 정렬
                justifyContent: 'center' // 중앙 정렬
            }}>
                {error && <Alert severity="error">{error}</Alert>}
                
                {/* 프로필 영역 */}
                <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    width: '100%', 
                    maxWidth: '1000px', 
                    height: '200px' 
                }}>
                    <img 
                        src={`http://localhost:3100/${profileImg}`} 
                        alt="Profile"
                        style={{
                            width: '150px', // 가로 크기
                            height: '150px', // 세로 크기
                            borderRadius: '50%', // 원형으로 만들기
                            marginRight: '10px', // 프로필 이미지와 텍스트 사이의 간격
                        }}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography>{userId}</Typography> {/* 사용자 ID */} 
                        <Button color="inherit" href={`http://localhost:3000/user/${userId}`}>프로필 수정</Button>
                    </Box>
                </Box>

                {/* 피드 영역 */}
                <Box sx={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(3, 300px)', 
                    gap: '10px', 
                    justifyContent: 'center', 
                    width: '100%', 
                    maxWidth: '1000px',
                    marginTop: '20px' // 상단 여백 추가
                }}>
                    {Object.entries(groupedFeed).map(([feedNo, images]) => (
                        <Box key={feedNo} sx={{ width: '300px', height: '300px' }}>
                            {images.length > 0 && (
                                <Slider {...settings} style={{ marginTop: '0', height: '200px', position: 'relative' }}>
                                    {images.map((image, index) => (
                                        <div key={index} onClick={() => handleImageClick(feedNo)}> {/* 클릭 이벤트 추가 */}
                                            <img 
                                                sx={{ width: '300px', height: '300px' }}
                                                src={`http://localhost:3100/${image.img_path}`} 
                                                alt={`Feed ${index + 1}`}
                                                style={{
                                                    width: '300px', 
                                                    height: '300px', 
                                                    objectFit: 'cover', 
                                                    borderRadius: '4px', 
                                                    margin: '0'
                                                }} 
                                            />
                                        </div>
                                    ))}
                                </Slider>
                            )}
                        </Box>
                    ))}
                </Box>

                {/* 단일 피드 모달 */}
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>피드 내용</DialogTitle>
                    <DialogContent>
                        {oneFeed ? ( // oneFeed가 null이 아닐 때만 렌더링
                            <>
                                <Typography>{oneFeed.content}</Typography>
                                <img 
                                    src={`http://localhost:3100/${oneFeed.img_path}`} // 올바른 img_path 사용
                                    alt="Selected Feed"
                                    style={{
                                        width: '100%', 
                                        height: 'auto', 
                                        borderRadius: '4px', 
                                        marginTop: '10px'
                                    }} 
                                />
                            </>
                        ) : (
                            <Typography>로딩 중...</Typography> // 로딩 상태 표시
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => fnDelete(oneFeed.feed_no)}>삭제</Button> {/* feedNo 전달 */}
                        <Button onClick={handleClose} color="primary">닫기</Button>
                    </DialogActions>

                </Dialog>
            </Box>
        </Box>
    );
};

export default Feed;
