const AV=require("leancloud-storage");
//邮件推送模块
const nodemailer=require("nodemailer");

const APP_ID='9HVVmfSplMBKBoFArE21QUBY-gzGzoHsz';
const APP_KEY='eD3DORfX1dVgpctm6zxc3EPe';

//模块初始化
AV.init({
    appId:APP_ID,
    appKey:APP_KEY
});


const smsController={
    sendCode(req,resp){
        console.log(req.body.phone);
        AV.Cloud.requestSmsCode({
            mobilePhoneNumber:req.body.phone,
            name:'请在两分钟内输入验证码',//正在使用xxx服务
            op:'登录',//进行的操作 注册，登录 密码重置
            ttl:2//当前验证码有效时间
        }).then(function () {
            //调用成功
            resp.send("验证码发送成功");
        }, function (err) {
            console.log(err);
            resp.send("验证码发送失败，请检查手机号");
        })
    },
    sendMail(req,resp){
        console.log(req.body.mailContent);
        let transporter=nodemailer.createTransport({
            host:'smtp.qq.com',
            port:587,
            secure:false,
            auth:{//账号
                user:"25261821@qq.com",
                pass:"gulpdyccmzosbgec"
            }
        });

        let mailOptions={
            from:'<25261821@qq.com>',
            to:req.body.receiver,
            subject:'嘿嘿嘿',
            html:req.body.mailContent,
            attachments:[{
                filename:"1.jpg",
                path:"./public/images/1.jpg"
            }]
        };


        //执行发送邮件

        transporter.sendMail(mailOptions,(error,info)=>{
            if(error){
                console.log(error);
                resp.send(error);
            }else {
                resp.send(info);
            }
        })

    }

};
module.exports=smsController;