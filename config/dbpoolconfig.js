const mysql=require("mysql");
const dbpool={
   pool:{},
   config:{
       host:"localhost",//主机地址
       port:"3306",//端口号
       user:"root",
       password:"root",
       database:"beike"
   },
   create(){
       console.log("创建连接池");
       this.pool=mysql.createPool(this.config);
   },
   connect(sql,arr,fn){//sql语句，参数，回调函数
       this.pool.getConnection((err,connection)=>{
           connection.query(sql,arr,fn);
           connection.release();
       })
   }
};
dbpool.create();
module.exports=dbpool;