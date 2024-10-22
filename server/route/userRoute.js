const express = require('express')
const router = express.Router();
const connection = require('../db');

router.route("/")
    .get((req,res)=>{
        const query = 'SELECT * FROM TBL_USER WHERE id=?';
        connection.query(query, (err,results)=>{
            if(err){
                console.log('쿼리 실행 실패', err);
                return;
            }
            res.json({success:true, list:results});
        })
    })

router.route("/insert")
    .post((req,res)=>{
        const { id, pwd, phone } = req.body;
        console.log(req.body);
        const query = 'INSERT INTO TBL_USER (id, pwd, phone) VALUES (?, ?, ?)';
        console.log("!!!!"+id, pwd, phone);
        connection.query(query, [id,pwd,phone], (err, result)=>{
            if(err){
                console.error('DB에 사용자 저장 중 오류 발생:', err);
                return res.json({ success: false, message: "DB 오류" });
            }
            res.json({success:true, message:"가입 성공"})
        })
    })    

module.exports = router;    