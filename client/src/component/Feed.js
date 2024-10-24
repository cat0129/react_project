import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Paper, Alert, Button } from '@mui/material';

const Feed = ({ }) => {
    const userId = localStorage.getItem('userId');
    const [feed, setFeed] = useState([]);
    const [allFeeds, setAllFeeds] = useState([]);
    const [error, setError] = useState(null); // 초기값을 null로 설정

    async function getFeed() {
        setError(null); // 에러 초기화
        console.log("id!!!!"+userId);
        try {
            const res = await axios.get(`http://localhost:3100/feed/${userId}`);
            if (res.data.list.length > 0) {
                setFeed(res.data.list);
            } else {
                setError("피드가 없음");
            }
        } catch (err) {
            setError(err.message);
        }
    }

    async function getAllFeed() {
        setError(null);
        try{
            const res = await axios.get('http://localhost:3100/feed');
            if(res.data.list.length>0){
                setAllFeeds(res.data.list);
            } else {
                setError("피드가 없음");
            }
        } catch (err) {
            setError(err.message);
        }
    }

    useEffect(() => {
        getFeed(); // 특정 피드 가져오기
        getAllFeed();
    }, [userId]); // id와 feedNo가 변경될 때마다 호출

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            padding={3}
            sx={{ backgroundColor: '#f0f4f8' }}
        >

            {feed.map((feeds) => (
                <Paper key={feeds.id} sx={{ width: '100%', maxWidth: '600px', mb: 2, p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        {feeds.user_id}
                    </Typography>
                    {feeds.imgPath && (
                        <img src={feeds.imgPath} alt="Feed" style={{ width: '100%', height: 'auto', borderRadius: '4px' }} />
                    )}
                    <Typography variant="body1" gutterBottom>
                        {feeds.content}
                    </Typography>
                    <Typography variant="caption" color="textSecondary" gutterBottom>
                        {new Date(feeds.cdatetime).toLocaleString()}
                    </Typography>
                    <Box display="flex" justifyContent="space-between" mt={1}>
                        <Box>
                            {/* <FileUpload /> */}
                        </Box>
                    </Box>
                </Paper>
            ))}
        </Box>
    );
};

export default Feed;
