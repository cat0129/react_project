import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Box, Typography, Alert, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Slider from 'react-slick';
import Logout from './Logout';
import Menu from './Menu';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Feed = () => {
    const [profileImg, setProfileImg] = useState('');
    const [feed, setFeed] = useState([]);
    const [oneFeed, setOneFeed] = useState(null); // 변경: 단일 피드를 저장할 상태
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false); // 모달 상태
    const [isFollowing, setIsFollowing] = useState(false);
    const [followCount, setFollowCount] = useState(0);
    const [comments, setComments] = useState([]);
    const token = localStorage.getItem('token');
    const localUserId = localStorage.getItem('userId');
    const comment = useRef('');

    const getUserIdFromUrl = () => {
        const url = window.location.href; // 현재 URL 가져오기
        const pathParts = url.split('/'); // 슬래시로 나누기
        const userId = pathParts[pathParts.length - 1]; // 마지막 부분이 userId
        return userId;
    };

    const userId = getUserIdFromUrl();

    async function getFeed() {
        console.log("아이디!"+userId)
        setError(null);
        try {
            const res = await axios.get(`http://localhost:3100/feed/${userId}`, {
                headers: { Authorization: `Bearer ${token}` } 
            });
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
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.data.success) {
                if (res.data.imgPaths) {
                    setOneFeed({
                        imgPaths: res.data.imgPaths,
                        feed_no: feedNo,
                        content : res.data.feedContent
                    });
                    setOpen(true); // 모달을 여는 부분
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
        console.log("~!!!!!" + feedNo);
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

    async function fnFollow() {
        try {
            const res = await axios.post('http://localhost:3100/user/follow', {
                userId: localUserId,
                followId: userId,
            });
    
            if (res.data.success) {
                setIsFollowing(true); // 팔로우 성공 시 상태 업데이트
            }
        } catch (err) {
            setError(err.message);
        }
    }

    async function fnUnfollow() {
        try{
            const res = await axios.delete('http://localhost:3100/user/follow', {
                userId : localUserId,
                followId : userId
            })
            if(res.data.success){
                setIsFollowing(false);
            }
        } catch (err) {
            setError(err.message)
        }
    }
    
    async function checkIfFollowing() {
        console.log("팔로잉여부"+isFollowing)
        try {
            const res = await axios.post('http://localhost:3100/user/following', {
                    userId: localUserId,
                    followId: userId,
                },
            )
    
            if (res.data.success) {
                setIsFollowing(res.data.isFollowing); // 서버에서 팔로우 상태를 받아 업데이트
            }
        } catch (err) {
            setError(err.message);
        }
    }

    async function getFollowCount() {

        try {
            const res = await axios.post('http://localhost:3100/user/followCount', {
                    userId: userId 
            });

            if (res.data.success) {
                setFollowCount(res.data.followCount); // 상태 업데이트
            }
        } catch (err) {
            setError(err.message);
        }
    }

    const fnComment = async ()=>{
        if(!comment){
            alert("댓글을 입력하세요");
            return;
        }
        try{
            const res = await axios.post(`http://localhost:3100/feed/${oneFeed.feed_no}/comment`, {
                userId : localUserId,
                comment : comment
            })
            if(res.data.success){
                getComment(oneFeed.feed_no);
            }else{
                alert("댓글 작성 실패")
            }
        } catch (err) {
            alert("오류 발생"+err.message)
        }
    }

    const getComment = async ()=>{
        console.log("피드넘버"+oneFeed.feed_no)
        try {
            const res = await axios.get(`http://localhost:3100/feed/${oneFeed.feed_no}/comments`, {
                userId : localUserId
            });
            if (res.data.success) {
                setComments(res.data.comments);
            }
        } catch (err) {
            console.error("코멘트를 불러오는 중 오류 발생:", err);
        }
    }

    useEffect(() => {
        getFeed();
        checkIfFollowing();
        getFollowCount();
    }, [userId, localUserId]);
    
    useEffect(() => {
        if (oneFeed) getComment();
    }, [oneFeed]);

    return (
        <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
            {/* 세로 툴바 */}
           <Menu></Menu>
            {/* 메인 피드 영역 */}
            <Box sx={{ 
                flexGrow: 1, 
                padding: '20px', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', // 중앙 정렬
                justifyContent: 'flex-start', // 상단 정렬
                overflowY: 'auto', // 세로 스크롤 가능
                height: '100vh' // 전체 화면 높이 설정
            }}>
                {error && <Alert severity="error">{error}</Alert>}
                
                {/* 프로필 영역 */}
                <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    width: '100%', 
                    maxWidth: '1000px', 
                    height: '200px',
                    marginBottom: '50px',
                    marginTop: '60px'
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
                        {userId==localUserId && (
        
                            <Button color="inherit" href={`http://localhost:3000/user/${userId}`}>프로필 수정</Button>
                        )}
                        {userId !== localUserId && ( // 팔로우 버튼 표시 조건
                            <>
                                <Button color="inherit" onClick={isFollowing ? fnUnfollow : fnFollow}>
                                    {isFollowing ? '언팔로우' : '팔로우'}
                                </Button>
                            </>
                        )}
                        <Typography>팔로우 {followCount}</Typography>
                        <Typography>팔로워</Typography>
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
                    marginTop: '20px', // 상단 여백 추가
                    marginBottom: '100px'
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
                    {/* <DialogTitle>피드 내용</DialogTitle> */}
                    <DialogContent sx={{ height: '70vh', overflow: 'hidden' }}>
                        {oneFeed ? ( // oneFeed가 null이 아닐 때만 렌더링
                            <>
                                <Slider {...settings} style={{ marginTop: '10px', borderRadius: '4px' }}>
                                    {/* 이미지 경로가 여러 개인 경우 */}
                                    {oneFeed.imgPaths && oneFeed.imgPaths.length > 0 ? (
                                        oneFeed.imgPaths.map((imgPath, index) => (
                                            <div key={index}>
                                                <img 
                                                    src={`http://localhost:3100/${imgPath}`} // 올바른 img_path 사용
                                                    alt={`Selected Feed ${index + 1}`}
                                                    style={{
                                                        width: '100%', 
                                                        height: '100%', 
                                                        objectFit: 'cover' 
                                                    }} 
                                                />
                                            </div>
                                        ))
                                    ) : (
                                        <Typography>이미지가 없습니다.</Typography>
                                    )}
                                </Slider>
                                <Typography>{oneFeed.content}</Typography>
                                <Button onClick={() => fnDelete(oneFeed.feed_no)}>삭제</Button>
                                {/* 댓글 리스트 */}
                                <Box sx={{ marginTop: '20px' }}>
                                    <Typography variant="h6">댓글</Typography>
                                    {comments.length > 0 ? (
                                        comments.map((comment, index) => (
                                            <Box key={index} sx={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', marginBottom: '5px' }}>
                                                <Typography variant="body2"><strong>{comment.userId}</strong>: {comment.comment}</Typography>
                                            </Box>
                                        ))
                                    ) : (
                                        <Typography>댓글이 없습니다.</Typography>
                                    )}
                                    {/* 댓글 입력 */}
                                    <Box sx={{ display: 'flex', marginTop: '10px' }}>
                                        <input
                                            type="text"
                                            ref={comment}
                                            placeholder="댓글을 입력하세요"
                                            style={{
                                                flexGrow: 1,
                                                padding: '10px',
                                                borderRadius: '4px',
                                                border: '1px solid #ccc',
                                                marginRight: '10px'
                                            }}
                                        />
                                        <Button variant="contained" onClick={fnComment}>등록</Button>
                                    </Box>
                                </Box>
                            </>
                        ) : (
                            <Typography>피드 내용을 불러오는 중입니다...</Typography>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
    );
};

export default Feed;
