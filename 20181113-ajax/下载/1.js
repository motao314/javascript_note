let http = require("http");
let fs = require("fs")
http.createServer(function(req,res){
    fs.readFile("./1.txt",function(err,data){
        res.writeHead(200,{'Content-Type':'text/plain;charset=UTF8'});
        res.write(data.toString());
        res.end();
    });
}).listen(3000);