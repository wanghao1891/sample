// curl -F 'files=@export_mission_task_link_at_crm.tar.gz' http://127.0.0.1:3000/

const http = require("http");
const app = http.createServer();
const formidable = require("formidable");
const path = require("path");
app.on("request",(req,res)=>{
    if(req.method=="POST"){
        var form = new formidable.IncomingForm();
        form.keepExtensions = true;
        form.multiples = true;
        console.log(form.type);
        form.uploadDir =path.join(__dirname,"my");
        form.parse(req,function(err,fields,files){
            res.end(JSON.stringify({fields,files}))
        })
    }
})
app.listen(3000,()=>{
    console.log("ok");
})
