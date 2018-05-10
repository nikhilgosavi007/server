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
            }else if(rows && rows.length>0){
                finalRes['isExist']=true;
                finalRes['flag']=true;
            }else{
                finalRes['isExist']=false;
                finalRes['flag']=true;
            }
            res.json(finalRes);
        },err=>{
            finalRes['err']=err;
            finalRes['flag']=false;
        });
    } 
});

router.post('/get_user_by_username',function(req,res,next){  
    if(req.body && req.body.username  && req.body.type ){
        var finalRes={};
        User.get_user_by_username(req.body.username,req.body.type,function(err,rows){
            if(err){
                finalRes['err']=err;
                finalRes['flag']=false;
            }else{
                if(rows && rows[0]){
                    if(rows[0]['password'] && rows[0]['password'].length >0){
                        delete rows[0]['password'];
                        rows[0]['haspassword']=true;
                        finalRes['data']=rows;
                        finalRes['flag']=true;
                    }else{
                        rows[0]['haspassword']=false;
                        finalRes['data']=rows;
                        finalRes['flag']=true;
                    }
                  
                }else{
                    finalRes['data']=[];
                    finalRes['flag']=false;
                }
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
        User.login(req.body.username,req.body.password,req.body.type,function(err,rows){
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


router.post('/validate_student_user_before_update',function(req,res,next){  
    if(req.body && req.body.userdata){
        var finalRes={};
        var valid=false;
        var ud=req.body.userdata;
        User.validate_student_user_before_update(req.body.userdata,function(err,rows){
            if(err){
                finalRes['err']=err;
                finalRes['flag']=false;
            }else{ 
                if(rows && rows[0] ){
                    //do not allow any value by user
                    //valid=(ud['fname']==rows[0]['fname'])   &&  (ud['lname']==rows[0]['lname'])  &&  (ud['email']==rows[0]['email'])  &&  (ud['rollno']==rows[0]['rollno'])  &&  (ud['type']==rows[0]['type'])  &&  (ud['standard_id']==rows[0]['standard_id'])  &&  (ud['division_id']==rows[0]['division_id']);                     
                    
                    //allow values by user if they are blank in database
                    valid=(ud['fname']==rows[0]['fname'] || rows[0]['fname']=='' )   &&  (ud['lname']==rows[0]['lname'] || rows[0]['lname']=='')  &&  (ud['email']==rows[0]['email'] || rows[0]['email']=='')  &&  (ud['rollno']==rows[0]['rollno'] || rows[0]['rollno']=='' )  &&  (ud['type']==rows[0]['type'] || rows[0]['type']=='' )  &&  (ud['standard_id']==rows[0]['standard_id'] || rows[0]['standard_id']=='')  &&  (ud['division_id']==rows[0]['division_id'] || rows[0]['division_id']=='');
                    finalRes['isvalid']=valid;
                    finalRes['flag']=true;
                }else{
                    finalRes['isvalid']=false;
                    finalRes['flag']=true;
                }
  
            }
            res.json(finalRes);
        },err=>{
            finalRes['err']=err;
            finalRes['flag']=false;
        });
    } 
});

router.post('/update_user',function(req,res,next){  
    if(req.body && req.body.userdata){
        var finalRes={};
        User.update_user(req.body.userdata,function(err,rows){
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


router.post('/create_user',function(req,res,next){  
    if(req.body && req.body.userdata){
        var finalRes={};
        User.create_user(req.body.userdata,function(err,rows){
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