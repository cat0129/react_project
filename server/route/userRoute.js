const express = require('express')
const router = express.Router();
const connection = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const { jwtAuthentication } = require('../jwtAuth');
const JWT_KEY = "secret_key";
const ROUND = 10;

// Multer 설정 (파일 저장 위치 및 파일명 설정)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'profileImg/'); // 파일 저장 위치
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // 파일명 설정
    }
});
const upload = multer({ storage: storage });

router.route("/")
    .post(async (req,res)=>{
        const {id, pwd} = req.body;
        const query = 'SELECT * FROM TBL_USER WHERE id=?'
        connection.query(query, [id], async (err,results)=>{
            if(err) throw err;
            if(results.length>0){
                const user = results[0];
                const password = user.pwd;
                const login = await bcrypt.compare(pwd,password);
                if(login){
                    const token = jwt.sign({id:user.id}, JWT_KEY, {expiresIn:'1h'});
                    res.json({ success: true, message : "로그인 성공", id: user.id, token });
                } else{
                    res.json({ success: false, message: '로그인 실패' });
                  }
                } else{
                  res.json({ success: false, message: '회원 정보가 없습니다' });
                }
        })
    })

router.route("/:id")
    .get(async (req,res)=>{
        const id = req.params.id;
        const query = 'SELECT * FROM TBL_USER WHERE id=?'
        connection.query(query, [id], (err,result)=>{
            if(err){
                console.error("사용자 정보 출력 중 오류 발생");
                return res.json({success:false, message:"DB 오류"})
            }
            if (result.length > 0) {
                // 사용자 정보를 포함하여 응답
                const userInfo = result[0];
                res.json({
                    success: true,
                    message: "정보 출력 성공",
                    userInfo: {
                        id: userInfo.id,
                        name: userInfo.name,
                        phone: userInfo.phone,
                        profile_img_path: userInfo.profile_img_path // 추가된 부분
                    }
                });
            } else {
                res.json({ success: false, message: "사용자를 찾을 수 없습니다." });
            }
        });
    })
    .put(upload.single('profileImg'), (req, res) => {
        const id = req.params.id;
        const phone = req.body.phone; // 전화번호 가져오기
        const profile_img_path = req.file ? req.file.path : null; // 이미지 경로 가져오기 (업로드된 경우)

        // 데이터베이스 업데이트 쿼리
        const query = 'UPDATE TBL_USER SET phone=?, profile_img_path=? WHERE ID=?';
        connection.query(query, [phone, profile_img_path, id], (err, result) => {
            if(err) {
                console.log("정보 수정 중 오류 발생");
                return res.json({success:false, message:"DB 오류"});
            }
            res.json({success:true, message:"업데이트 성공"});
        });
    })
    .delete((req,res)=>{
        const userId = req.params.id;
        const query = 'DELETE FROM TBL_USER WHERE id=?'
        connection.query(query, [userId], (err, result)=>{
            if(err){
                return res.json({success:false, message:"DB 오류"});
            }
            res.json({success:true, message:"회원 정보 삭제 성공"})
        })
    });
  
router.route("/insert")
    .post(upload.single('profileImg'), async (req, res) => {
        const { id, pwd, phone } = req.body;
        const hashedPwd = await bcrypt.hash(pwd, ROUND); // 비밀번호 해싱
        const profileImgPath = req.file ? req.file.path : null;

        const query = 'INSERT INTO TBL_USER (id, pwd, phone, profile_img_path) VALUES (?, ?, ?, ?)';
        connection.query(query, [id, hashedPwd, phone, profileImgPath], (err, result) => {
            if (err) {
                console.error('DB에 사용자 저장 중 오류 발생:', err);
                return res.json({ success: false, message: "DB 오류"});
            }
            res.json({ success: true, message: "가입 성공" });
        });
    });

router.route("/search")
    .post(async (req,res)=>{
        const keyword = req.body.keyword;
        console.log("!!!!"+keyword);
        const query = `SELECT * FROM TBL_USER WHERE id LIKE ?`;
        connection.query(query, [`%${keyword}%`], (err, result)=>{
            if(err){
                console.error('사용자 검색 중 오류 발생', err);
                return res.json({success:false, message:"DB 오류"});
            }
            res.json({success:true, message:"검색 성공", result});
        })
    })    

router.route("/follow")
    .get(async (req,res)=>{
        const userId = req.body;
        const query = 'SELECT * FROM TBL_FOLLOW WHERE user_id=?'
        connection.query(query, [userId], (err, result)=>{
            if(err){
                return res.json({success:false, message:"DB 오류"})
            }
            res.json({success:true, message:"팔로우 조회 성공"})
        })
    })
    .post(async (req,res)=>{
        const { userId, followId } = req.body;
        const checkFollowQuery = 'SELECT * FROM TBL_FOLLOW WHERE user_id=? AND follow_id=?';
        connection.query(checkFollowQuery, [userId, followId], (err, results) => {
            if (err) {
                return res.json({ success: false, message: "DB 오류" });
            }
            // 이미 팔로우 중인 경우
            if (results.length > 0) {
                return res.json({ success: false, message: "이미 팔로우 중입니다." });
            }

            // 팔로우 추가
            const query = 'INSERT INTO TBL_FOLLOW (user_id, follow_id, follow_date) VALUES (?, ?, CURRENT_TIMESTAMP)';
            console.log(followId, userId);
            connection.query(query, [userId, followId], (err, result) => {
                if (err) {
                    return res.json({ success: false, message: "DB 오류" });
                }
                res.json({ success: true, message: "팔로우 성공" });
            });
        });
    })
    .delete(async (req,res)=>{
        const { userId, followId } = req.body;
        const query = 'DELETE FROM TBL_FOLLOW WHERE user_id=? AND follow_id=?'
        connection.query(query, [userId, followId], (err, result)=>{
            if(err){
                return res.json({success:false, message:"DB오류"})
            }
            return res.json({success:true, message:"언팔로우 성공"})
        })
    })


router.route("/following")
    .post(async (req, res) => {
        const { userId, followId } = req.body; // 쿼리 파라미터에서 userId와 followId를 가져옴
        const query = 'SELECT * FROM TBL_FOLLOW WHERE user_id = ? AND follow_id = ?';
        console.log("user/follow"+userId, followId)
        connection.query(query, [userId, followId], (err, result) => {
            if (err) {
                return res.json({ success: false, message: "DB 오류" });
            }
            // 조건부로 isFollowing 값을 설정
            const isFollowing = result.length > 0;
            console.log("이즈팔로잉"+isFollowing);
            res.json({ success: true, isFollowing });
        });
});
 

router.route("/followCount")
    .post(async (req,res)=>{
        const userId = req.body.userId;
        const query = 'SELECT COUNT(*) AS followCount FROM TBL_FOLLOW WHERE user_id = ?';
        connection.query(query, [userId], (err, result)=>{
            if(err){
                return res.json({success:false, message:"DB오류"})
            }
            const followCount = result[0].followCount;
            res.json({success:true, message:"조회 성공", followCount})
        })
    })


module.exports = router;    