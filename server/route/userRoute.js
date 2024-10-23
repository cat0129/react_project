const express = require('express')
const router = express.Router();
const connection = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwtAuthentication } = require('../jwtAuth');
const JWT_KEY = "secret_key";
const ROUND = 10;

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
    .post(async (req,res)=>{
        const {id, pwd} = req.body;
        const query = 'SELECT * FROM TBL_USER WHERE id=?'
        connection.query(query, [id], async (err,results)=>{
            if(err) throw err;
            if(results.length>0){
                const user = results[0];
                const password = user.pwd;
                console.log(user);
                const login = await bcrypt.compare(pwd,password);
                console.log(login);
                if(login){
                    const token = jwt.sign({id:user.id}, JWT_KEY, {expiresIn:'1h'});
                    res.json({ success: true, message : "로그인 성공" });
                } else{
                    res.json({ success: false, message: '로그인 실패' });
                  }
                } else{
                  res.json({ success: false, message: '회원 정보가 없습니다' });
                }
        })
    })

  
router.route("/insert")
    .post(async (req, res) => {
        const { id, pwd, phone } = req.body;
        const hashedPwd = await bcrypt.hash(pwd, ROUND); // 비밀번호 해싱

        const query = 'INSERT INTO TBL_USER (id, pwd, phone) VALUES (?, ?, ?)';
        connection.query(query, [id, hashedPwd, phone], (err, result) => {
            if (err) {
                console.error('DB에 사용자 저장 중 오류 발생:', err);
                return res.json({ success: false, message: "DB 오류" });
            }
            res.json({ success: true, message: "가입 성공" });
        });
    });

module.exports = router;    