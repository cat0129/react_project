const jwt = require('jsonwebtoken');
const JWT_KEY = "secret_key";

const jwtAuthentication = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ success: false, message: "토큰이 없습니다." });
    }
    jwt.verify(token, JWT_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ success: false, message: "유효하지 않은 토큰" });
        }
        req.user = user; // 사용자 정보를 req.user에 저장
        next(); // 다음 미들웨어로 이동
    });
};

module.exports = jwtAuthentication; // 함수로 내보내기
