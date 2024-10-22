const express = require('express')
const router = express.Router();
const connection = require('../db');

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

module.exports = router;    