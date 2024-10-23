const express = require('express')
const router = express.Router();
const connection = require('../db');
const multer = require('multer');
const path = require('path');

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
        // 피드 먼저 등록
        const feedQuery = 'INSERT INTO TBL_FEED (user_id, content) VALUES (?, ?)';
        const userId = "user1";
        console.log(content);
        
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
    
module.exports = router;    