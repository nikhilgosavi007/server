var db=require('../dbconnection'); //reference of dbconnection.js
var studentAttendanceModel={
    get_students_by_std_div_id:function(standard_id,division_id,callback){
        return db.query("SELECT id,fname,lname,rollno,standard_id,division_id FROM user WHERE standard_id=? and division_id=? and type='student' ORDER BY rollno ASC",[standard_id,division_id],callback);
    },
    check_attendance_by_std_div_id:function(standard_id,division_id,date,callback){
        return db.query("SELECT id FROM  student_attendance WHERE standard_id=? and division_id=? and date=?",[standard_id,division_id,date],callback);
    },
    create_new_attendance_record:function(attendancedata,callback){  
        var dataArr = [];
        var paramsArr=[];
        var keysArr=[];
        keysArr=Object.keys(attendancedata);
        keysArr.forEach(function(o){
            dataArr.push(attendancedata[o]);
            paramsArr.push("?");
        });
        var paramsKey= paramsArr.join(', ');
        var keyString=Object.keys(attendancedata).join(', ');
        var query = "INSERT INTO  student_attendance (" + keyString + ") VALUES ("+ paramsKey +")";
        return db.query(query,dataArr,callback);
    },  
    get_division_wise_attendance_data:function(standard_id,division_id,from_date,to_date,callback){  
        return db.query("SELECT user.rollno,user.fname,user.lname,student_attendance.date,student_attendance.is_present FROM `student_attendance` LEFT JOIN `user` ON user.id=student_attendance.student_id WHERE student_attendance.standard_id = ? AND student_attendance.division_id = ? AND (student_attendance.date BETWEEN ? AND ?) ORDER BY user.rollno ASC",[standard_id,division_id,from_date,to_date],callback);
    },

  
};
module.exports=studentAttendanceModel;