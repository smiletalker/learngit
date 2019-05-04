const express=require("express");

const fileController=require("../controller/uploadController");
const smsController=require("../controller/smsController");
// const path=require("path");

const upload=require("../config/uploadconfig");




// 获取路由对象
const router=express.Router();//调用express对象提供的路由方法获取路由对象

//1.拦截路径 2.调用upload模块 3.分发controller
//single(参数)：参数是html中file里面的name值
router.post("/uploadFile.do",upload.single("myfile"),fileController.uploadFile);
//拦截多个文件
router.post("/uploadFiles.do",upload.array("myfiles"),fileController.uploadFiles);

router.get("/getImage.do",fileController.getImage);

//点击下载
router.get("/fileDownload.do",function (req,resp) {
    /*express封装了download (1.下载文件的路径 2.下载后保存的文件名)*/
    resp.download("./public/uploads/duorou.jpg","huahua.jpg");
});

//短信验证
router.post("/sendCode.do",smsController.sendCode);

//邮件推送
router.post("/sendMail.do",smsController.sendMail);


router.post("/sendCode.do",smsController.sendCode);



module.exports=router;

