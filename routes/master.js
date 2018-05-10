var express = require('express');
var router = express.Router();
var Master=require('../models/master');

router.get('/get_standards_data',function(req,res,next){  
        var finalRes={};
        Master.get_standards_data(function(err,rows){
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
});

router.post('/get_divisions_data',function(req,res,next){  
    if(req.body && req.body.standard_id){
        var finalRes={};
        Master.get_divisions_data(req.body.standard_id,function(err,rows){
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