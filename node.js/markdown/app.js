var express = require('express'),
    app = express();

app.use(express.static('public'));

var port = process.env.PORT || 6008;
app.listen(port, '0.0.0.0', function() {
    console.log('Server listening on port', port);
});

var marked = require('marked');
console.log(marked('I am using __markdown__.'));

marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
});

console.log(marked('I am using __markdown__.'));
