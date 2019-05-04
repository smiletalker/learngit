const dbpool=require("../config/dbpoolconfig");
const fileController={
    uploadFile(req,resp){
        console.log("=============uploadController=============")
        console.log(req.file);
        let pathname="uploads/"+req.file.filename;
        let picName=(req.file.originalname).split(".")[0];
        dbpool.connect("insert into myimg values (?,?,?)",
            [null,picName,pathname],
            (err,data)=>{
            console.log(data);
            resp.send("上传成功");
            })
    },
    getImage(req,resp){
        dbpool.connect("select * from myimg where picName=?",
            ["love"],
            (err,data)=>{
            console.log(err);
            console.log(data);
            resp.send(data);
            })
    },
    uploadFiles(req,resp){
        console.log(req.files);
    }

};
module.exports=fileController;