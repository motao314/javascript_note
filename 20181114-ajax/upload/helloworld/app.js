const express = require('express');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');
const multer  = require('multer');
//静态文件
app.use(express.static('public'));
//post请求必须加的中间件
app.use(bodyParser.urlencoded({ extended: false }));
//上传需要的模块
app.use(multer({ dest: '/upload/'}).array('file'));

//当访问upload接口，说明要上传
app.post('/upload',(req,res)=>{
    let obj = {};
    //放置文件的路径 + 文件的名字
    var des_file = (__dirname + "/upload/") + req.files[0].originalname;
    //读要上传的文件
    fs.readFile( req.files[0].path, function (err, data) {
        //把读出来的数据写入到指定的地址中
        fs.writeFile(des_file,data,(err)=>{
            if(err){
                obj.code = 1;
                obj.msg = '上传失败';
            }else{
                obj.code = 0;
                obj.msg = '上传成功';
            }
            res.json( obj );
        });
    });
})

app.listen(8099);


