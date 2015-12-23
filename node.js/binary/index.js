var fs = require('fs');

fs.readFile('../tcp/server', function (err, data) {
    if (err) throw err;
    console.log(data);
    console.log(myfunc.toString());
    function myfunc() {
        data.toString();
    }
});
