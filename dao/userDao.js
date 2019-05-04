//1.连接数据库
const dbpool=require("../config/dbpoolconfig");
const userModel={
    checkUser(params){
        return new Promise((resolve,reject)=>{
            dbpool.connect("select * from t_user where username=? and pwd=?",
                params,
                (err,data)=>{
                    if(!err){
                        console.log(data);
                        resolve(data);
                    }else {
                        reject(err)
                    }

                })
        })
    }
};
module.exports=userModel;