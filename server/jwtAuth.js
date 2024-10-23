const jwt = require('jsonwebtoken');

const jwtAuthentication = (req,res,next)=>{
    //next는 feedRoute의 콜백함수 부분(get방식 jwtAuthentication 뒷부분)
    //jwt.verify();
    const token = req.headers.token;
    console.log(req.headers.token);
    if(!token){
        return res.json({success:false, message:"로그인해주세요"});
    }
    jwt.verify(token, "secret_key", (err,user)=>{
        if(err){
            return res.json({success:false, message:"유효하지 않은 토큰"})
        }
        next();
    });
}

module.exports = jwtAuthentication;