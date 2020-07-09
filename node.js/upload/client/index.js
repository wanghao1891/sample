//const fs = require('fs');
//const axios = require('axios');
//const FormData =require('form-data');
// 
//var localFile = fs.createReadStream('./'+fileKey);
// 
//var formData = new FormData();
//formData.append('key',fileKey);
//formData.append('file',localFile);
// 
//var headers = formData.getHeaders();//获取headers
////获取form-data长度
//formData.getLength(async function(err, length){
// if (err) {
//    return  ;
//  }
// //设置长度，important!!!
// headers['content-length']=length;
// 
//await axios.post(data.url,formData,{headers}).then(res=>{                    
//       console.log("上传成功",res.data);
//  }).catch(res=>{
//    	console.log(res.data);
// })
// 
//})

const FormData = require('form-data');
const fs = require('fs');
const axios = require('axios');

let form = new FormData();

form.append('file', fs.createReadStream(__dirname + '/README.md'), {
filename: '111.md'
});

axios.create({
headers: form.getHeaders()
}).post('http://127.0.0.1:3000', form).then(response => {
console.log(response);
}).catch(error => {
if (error.response) {
console.log(error.response);
}
console.log(error.message);
});
