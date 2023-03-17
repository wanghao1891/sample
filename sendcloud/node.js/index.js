const axios = require('axios')

const url = "https://api.sendcloud.net/apiv2/mail/send"
const API_USER = '' || process.env.API_USER
const API_KEY = '' || process.env.API_KEY

let config = {
    timeout: 3 * 60 * 1000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
}

let params = {
    "apiUser": API_USER,
    "apiKey": API_KEY,
    "to": "wanghao@worktile.com",
    "from": "sendcloud@sendcloud.org",
    "fromName": "SendCloud",
    "subject": "SendCloud Node.js common",
    "html": "Welcome to SendCloud"
}

axios.post(url, params, config).then((resp) => {
    console.log(resp.data);
}).catch((err) => {
    console.log(err)
})
