import React, {useEffect, useRef, useState} from "react";  
import axios from "axios";
import {Box, Toolbar, AppBar, Button, TextField, Typography} from '@mui/material';

const Search = ()=>{
    const keywordRef = useRef();
    const [results, setResults] = useState([]);

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
        <Box>
           <TextField inputRef={keywordRef} label="아이디 검색" variant="outlined" margin="normal" />
           <Button onClick={fnSearch} variant="contained" color="primary">검색</Button>
           <Box mt={2}>
                {results.length > 0 ? (
                    results.map(user => (
                        <a href={`http://localhost:3000/feed/${user.id}`}><Typography key={user.id}>{user.id}</Typography></a>
                    ))
                ) : (
                    <Typography>검색 결과가 없습니다.</Typography>
                )}
            </Box>
        </Box>
    )    
}

export default Search;