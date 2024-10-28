const express = require('express')
const router = express.Router();
const connection = require('../db');
const multer = require('multer');
const path = require('path');
const jwtAuthentication = require('../jwtAuth');

// 파일 저장 경로 및 이름 설정
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      console.log(file);
      cb(null, 'img/'); // 서버 내 img 폴더
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname); // 파일 확장자
      cb(null, Date.now() + ext); // 날짜 데이터를 이용해서 파일 이름으로 저장
    },
  });
  
  // 파일 업로드 미들웨어 설정
  const upload = multer({ storage: storage });

  //토큰에서 아이디 추출
  const setUserId = (req, res, next)=>{
    if(req.user && req.user.id){
        req.userId = req.user.id;
    } else{
        return res.status(401).json({success:false, message:"유효하지 않은 사용자"})
    }
    next();
  }

  router.use(jwtAuthentication);
  router.use(setUserId);

router.route("/")
    .get((req,res)=>{
        const query = 'SELECT * FROM TBL_FEED';
        connection.query(query, (err,results)=>{
            if(err){
                console.log('쿼리 실행 실패', err);
                return;
            }
            res.json({success:true, list:results});
        })
    })
    .post(upload.array('images'), (req, res) => {
        const { content } = req.body;
        const userId = req.userId;
        if(req.userId==localStorage.getItem('userId')){
            
        }
        // 피드 먼저 등록
        const feedQuery = 'INSERT INTO TBL_FEED (user_id, content) VALUES (?, ?)';
        
        connection.query(feedQuery, [userId, content], (err, feedResult) => {
            if (err) {
                console.error('피드 등록 실패:', err);
                return res.json({ success: false, message: "피드 등록 실패" });
            }
            
            const feedNo = feedResult.insertId; // 등록된 피드의 ID 가져오기
            console.log("피드번호!!!!" + feedNo);
            
            // 이미지 등록
            const files = req.files;
            console.log("파일!!!!!" + files);
            
            if (!files || files.length === 0) {
                return res.json({ success: false, message: "파일이 업로드되지 않았습니다." });
            }
    
            // 이미지 정보를 DB에 등록
            const imageQueries = files.map(file => {
                const imgPath = file.path; // 파일 경로
                const cdatetime = new Date(); // 현재 시간
                return new Promise((resolve, reject) => {
                    const imgQuery = 'INSERT INTO tbl_feed_img (user_id, feed_no, img_path, cdatetime) VALUES (?, ?, ?, ?)';
                    connection.query(imgQuery, [userId, feedNo, imgPath, cdatetime], (err, result) => {
                        if (err) {
                            console.error('이미지 등록 실패:', err);
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });
                });
            });
    
            // 모든 이미지 쿼리 실행 후 응답
            Promise.all(imageQueries)
                .then(() => {
                    res.json({ success: true, message: "피드 및 파일이 성공적으로 저장되었습니다!" });
                })
                .catch(() => {
                    res.json({ success: false, message: "이미지 등록 중 오류 발생" });
                });
        });
    });

router.route("/:id")
    .get((req,res)=>{
        const userId = req.params.id;
        console.log(userId);
        const query = 'SELECT f.*, i.*, u.profile_img_path FROM tbl_feed f INNER JOIN tbl_feed_img i ON f.feed_no = i.feed_no INNER JOIN tbl_user u ON i.user_id=u.id WHERE f.user_id=?' 
        connection.query(query, [userId], (err, results)=>{
            if(err){
                alert("피드 출력 실패")
            }
            res.json({success:true, list:results});
            console.log(query, userId);
        })
    })

    
 
router.route("/:id/:feedNo")
    .get((req, res) => {
        const userId = req.params.id; // URL에서 userId 가져오기
        const feedNo = req.params.feedNo; // URL에서 feedNo 가져오기
        const query = 'SELECT F.*, I.img_path FROM TBL_FEED F INNER JOIN TBL_FEED_IMG I ON F.FEED_NO = I.FEED_NO WHERE f.user_id=? AND f.feed_no=?';
        connection.query(query, [userId, feedNo], (err, result) => {
            if (err) {
                console.error("피드 소환 실패", err);
                return res.json({ success: false, message: "피드 소환 실패" });
            }
            if (result.length > 0) {
                const imgPaths = result.map(item=>item.img_path);
                const feedContent = result[0];
                res.json({ success: true, message: "피드 소환 성공", imgPaths, feedContent });
            } else {
                res.json({ success: false, message: "피드를 찾을 수 없습니다." });
            }
        });

    })
    .delete((req,res)=>{
        const userId = req.userId; // req.userId 사용
        const feedNo = req.params.feedNo; // feedNo는 URL 파라미터에서 가져오기
        console.log("*****"+userId, req.params);
        const query1 = 'DELETE FROM TBL_FEED_IMG WHERE feed_no=? AND user_id=?';
        const query2 = 'DELETE FROM TBL_FEED WHERE feed_no=? AND user_id=?';
    
        connection.query(query1, [feedNo, userId], (err1, result1) => {
            if(err1){
                console.error("피드 이미지 삭제 실패", err1);
                return res.json({ success: false, message: "피드 이미지 삭제 실패" });
            }
    
            connection.query(query2, [feedNo, userId], (err2, result2) => {
                if(err2){
                    console.error("피드 삭제 실패", err2);
                    return res.json({ success: false, message: "피드 삭제 실패" });
                }
                res.json({success:true, message:"피드 삭제 성공"});
            });
        });
    })


module.exports = router;