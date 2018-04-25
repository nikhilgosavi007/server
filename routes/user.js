var express = require('express');
var router = express.Router();
var User=require('../models/user');

router.post('/check_uname_avail',function(req,res,next){  
    if(req.body && req.body.username){
        var finalRes={};
        User.check_duplicate_username(req.body.username,function(err,rows){
            if(err){
                finalRes['err']=err;
                finalRes['flag']=false;
            }else{
                finalRes['data']=rows;
                finalRes['flag']=true;
            }
            res.json(finalRes);
        },err=>{
            finalRes['err']=err;
            finalRes['flag']=false;
        });
    } 
});

router.post('/login',function(req,res,next){  
    if(req.body && req.body.username){
        var finalRes={};
        User.login(req.body.username,req.body.password,function(err,rows){
            if(err){
                finalRes['err']=err;
                finalRes['flag']=false;
            }else{
                finalRes['data']=rows;
                finalRes['flag']=true;
            }
            res.json(finalRes);
        },err=>{
            finalRes['err']=err;
            finalRes['flag']=false;
        });
    } 
});

module.exports=router;