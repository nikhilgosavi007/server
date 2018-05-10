var db=require('../dbconnection'); //reference of dbconnection.js
var masterModel={
    get_standards_data:function(callback){
        return db.query("SELECT * FROM standard_master",callback);
    },
    get_divisions_data:function(standard_id,callback){
        return db.query("SELECT * FROM division_master WHERE standard_id=?",[standard_id],callback);
    },
    
};
module.exports=masterModel;