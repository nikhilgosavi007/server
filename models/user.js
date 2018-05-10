var db=require('../dbconnection'); //reference of dbconnection.js
var userModel={
    check_duplicate_username:function(username,callback){
        return db.query("SELECT username FROM user WHERE username=?",[username],callback);
    },
    get_user_by_username:function(username,type,callback){
        return db.query("SELECT * FROM user WHERE username=? and type=?",[username,type],callback);
    },
    login:function(username,password,type,callback){
        return db.query("SELECT * FROM user WHERE username=? and password=? and type=?",[username,password,type],callback);
    },
    validate_student_user_before_update:function(userdata,callback){ 
        return db.query("SELECT * FROM user WHERE username=?",[userdata.username],callback); 
    },
    create_user:function(userdata,callback){  
            var dataArr = [];
            var paramsArr=[];
            var keysArr=[];
            keysArr=Object.keys(userdata);
            keysArr.forEach(function(o){
                dataArr.push(userdata[o]);
                paramsArr.push("?");
            });
            var paramsKey= paramsArr.join(', ');
            var keyString=Object.keys(userdata).join(', ');
            var query = "INSERT INTO user (" + keyString + ") VALUES ("+ paramsKey +")";
            return db.query(query,dataArr,callback);
        //return db.query("Insert into user (fname, lname, username, password, standard, division, rollno, email, type) values (?,?,?,?,?,?,?,?,?)",[userdata.fname,userdata.lname,userdata.username, userdata.password, userdata.standard, userdata.division,userdata.rollno,userdata.email,userdata.type],callback);
    },
    update_user:function(userdata,callback){  
            var dataArr = [];
            var paramsArr=[]; 
            var keysArr=[];
            var whereCond="username ='"+userdata['username']+"'";
            keysArr=Object.keys(userdata);
            keysArr.forEach(function(o){
                dataArr.push(userdata[o]);
                paramsArr.push(o+"=?");
            });

            var paramsKey= paramsArr.join(', ');
            if(whereCond!=""){
                whereCond='where '+whereCond;
            }
            var query = "update  user set "+ paramsKey +" "+whereCond;
            return db.query(query,dataArr,callback);
    },
};
module.exports=userModel;