const http=require("http");
const fs=require("fs");
const home=fs.readFileSync('./web.html');
const hostname='127.0.0.1';
const port=80;
const server=http.createServer((req,res)=>{
    url=req.url;
    res.setHeader('content-type','text/html');
    res.end(home);
});
server.listen(port,hostname,()=>{
    console.log('server running successfully')
})
 