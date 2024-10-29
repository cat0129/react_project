import React, {useEffect, useRef, useState} from "react";  
import axios from "axios";
import {Box, Toolbar, AppBar, Button, TextField, Typography} from '@mui/material';
import Logout from "./Logout";

const Search = ()=>{
    const keywordRef = useRef();
    const [results, setResults] = useState([]);
    const userId = localStorage.getItem('userId');

    useEffect(()=>{},[])

    async function fnSearch() {
        const keyword = keywordRef.current.value;
        try{
            const res = await axios.post("http://localhost:3100/user/search", {
                keyword:keyword 
            });
            if(res.data.success){
                const keyword = res.data.keyword;
                setResults(res.data.result);
            }else{
                alert(res.data.message);
            }
        } catch(err) {
            console.error("검색 중 오류 발생", err);
        }
    }

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
                <Button color="inherit" href="http://localhost:3000/">홈</Button>
                <Button color="inherit" href="http://localhost:3000/search">검색</Button>
                <Button color="inherit">알림</Button>
                <Button color="inherit" href="http://localhost:3000/upload">추가</Button>
                <Logout>로그아웃</Logout>
                <Button color="inherit" href={`http://localhost:3000/info/${userId}`}>설정</Button>
            </Box>

            {/* 검색 박스와 결과를 중앙에 정렬 */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                    backgroundColor: '#fbf6ef',
                }}
            >
                <TextField
                    inputRef={keywordRef}
                    label="아이디 검색"
                    variant="outlined"
                    margin="normal"
                    sx={{ width: '300px' }} // 검색 상자 너비 설정
                />
                <Button
                    onClick={fnSearch}
                    color="inherit"
                    sx={{ mt: 2 }}
                >
                    검색
                </Button>

                {/* 검색 결과 */}
                <Box mt={2} sx={{ width: '300px' }}>
                    {results.length > 0 ? (
                        results.map((user) => (
                            <a
                                href={`http://localhost:3000/feed/${user.id}`}
                                key={user.id}
                                style={{ textDecoration: 'none', color: 'inherit' }}
                            >
                                <Typography>{user.id}</Typography>
                            </a>
                        ))
                    ) : (
                        <Typography align="center" mt={2}>검색 결과가 없습니다.</Typography>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default Search;