var db=require('../dbconnection'); //reference of dbconnection.js
var userModel={
    check_duplicate_username:function(username,callback){
        return db.query("SELECT username FROM user WHERE username=?",[username],callback);
    },
    login:function(username,password,callback){
        return db.query("SELECT * FROM user WHERE username=? and password=?",[username,password],callback);
    }
};
module.exports=userModel;