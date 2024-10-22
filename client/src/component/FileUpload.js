import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Paper, Alert, Button } from '@mui/material';

const FileUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const fnFileChange = (event) => {
        const file = event.target.files; 
        setSelectedFile(file);
    };

    const fnUpload = () => {
        console.log('업로드할 파일:', selectedFile);
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            padding={3}
            sx={{ backgroundColor: '#f0f4f8' }}
        >
            <Typography variant="h6" gutterBottom>
                파일 업로드
            </Typography>
            <input type="file" onChange={handleFileChange} />
            {selectedFile && (
                <Typography variant="body1" gutterBottom>
                    선택한 파일: {selectedFile.name}
                </Typography>
            )}
            <Button
                variant="contained"
                color="primary"
                onClick={fnUpload}
                disabled={!selectedFile} // 파일이 선택되지 않은 경우 버튼 비활성화
            >
                업로드
            </Button>
        </Box>
    );
};

export default FileUpload;