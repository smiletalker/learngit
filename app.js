//express简单搭建服务器
const express=require("express");//加载express
//日志
const logger=require("morgan");
//小图标
const favicon=require("serve-favicon");
//处理post数据
const bodyParser = require("body-parser");

//引入session和cookies
const session=require("express-session");
const cookieParser=require("cookie-parser");

const path=require("path");


//自己的模块
const route=require("./routes/indexRouter");

const app=express();//执行express的全局函数，返回一个express的服务器对象


//2.日志模块  ：npm install morgan --save
app.use(logger("dev"));//调用日志模块，（开发）模式

//==============session and cookie配置==============
app.use(cookieParser());
app.use(session({
    name:"demo168",
    secret:"123123123",
    cookie:{
        maxAge:1000*60*60*24*30//以毫秒为单位
    },
    resave:true,//更新session-cookie失效时间
    rolling:true,
    saveUninitialized:true
}));



//===============ejs 配置=================npm install ejs --save
//视图引擎
app.set("views",path.join(__dirname,"views"));//视图文件路径
app.set("view engine","ejs");//视图解析引擎

//post数据读取
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());




//使用路由
app.use(route);



// 1.设置静态资源路径
app.use(express.static(__dirname+"/public"));//__dirname指向当前文件根目录
app.use(express.static(__dirname+"/public/html"));

//小图标 ：npm install serve-favicon --save

app.use(favicon(__dirname+"/public/images/favicon.ico"));


app.set("port",8885);//设置端口
app.listen(8885,()=>{
    console.log("服务器已启动"+app.get("port"));
});