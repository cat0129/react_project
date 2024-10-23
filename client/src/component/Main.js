import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Paper, Alert, Button } from '@mui/material';
// import FileUpload from './component/FileUpload';


const Main = ()=>{
    const [feed, setFeed] = useState([]);
    const [error, setError] = useState(true);

    async function getFeed() {
        try {
            const res = await axios.get('http://localhost:3000/');
            if(res.data.list.length>0){
                setFeed(res.data.list);
            }else{
                setError("피드가 없음");
            }
        } catch (err) {
            setError(err.message);
        }
    }

    useEffect(()=>{
        getFeed();
    }, []);

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            padding={3}
            sx={{ backgroundColor: '#f0f4f8' }}
        >
            {feed.map((feed) => (
                <Paper key={feed.id} sx={{ width: '100%', maxWidth: '600px', mb: 2, p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        {feed.id}
                    </Typography>
                    <img src={feed.imgPath} alt="Feed" style={{ width: '100%', height: 'auto', borderRadius: '4px' }} />
                    <Typography variant="body1" gutterBottom>
                        {feed.content}
                    </Typography>
                    <Typography variant="caption" color="textSecondary" gutterBottom>
                        {new Date(feed.cdatetime).toLocaleString()}
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

export default Main;
