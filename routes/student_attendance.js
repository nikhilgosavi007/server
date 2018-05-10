var express = require('express');
var router = express.Router();
var StudentAttendance=require('../models/student_attendance');

router.post('/get_students_by_std_div_id',function(req,res,next){  
    if(req.body && req.body.standard_id && req.body.division_id){
        var finalRes={};
        StudentAttendance.get_students_by_std_div_id(req.body.standard_id,req.body.division_id,function(err,rows){
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

router.post('/check_attendance_record_exists_for_division_by_date',function(req,res,next){  
    if(req.body && req.body.standard_id && req.body.division_id && req.body.date ){ 
        var finalRes={};
        StudentAttendance.check_attendance_by_std_div_id(req.body.standard_id,req.body.division_id,req.body.date,function(err,rows){
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

router.post('/create_new_attendance_record',function(req,res,next){  
    if(req.body && req.body.attendancedata){
        var finalRes={};
        StudentAttendance.create_new_attendance_record(req.body.attendancedata,function(err,rows){
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

router.post('/get_division_wise_attendance_data',function(req,res,next){  
    if(req.body && req.body.standard_id && req.body.division_id && req.body.from_date && req.body.to_date ){ console.log("req.body0",req.body);
        var finalRes={};
        StudentAttendance.get_division_wise_attendance_data(req.body.standard_id , req.body.division_id , req.body.from_date , req.body.to_date,function(err,rows){
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