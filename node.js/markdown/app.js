var express = require('express'),
    app = express();

app.use(express.static('public'));

var port = process.env.PORT || 6008;
app.listen(port, '0.0.0.0', function() {
  console.log('Server listening on port', port);
});

var marked = require('marked');
/*console.log(marked('I am using __markdown__.'));

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

var renderer = new marked.Renderer();

renderer.heading = function (text, level) {
  console.log('text:', text, 'level:', level);
  var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

  return '<h' + level + '><a name="' +
    escapedText +
    '" class="anchor" href="#' +
    escapedText +
    '"><span class="header-link"></span></a>' +
    text + '</h' + level + '>';
};

console.log(marked('# heading+', { renderer: renderer }));*/

var renderer = new marked.Renderer();

renderer.heading = function(text, level, raw, origin) {
  console.log('arguments:', arguments);
  return origin;
};

console.log('parse', marked('## heading 2\n### heading 3'));
console.log('filter',marked('## heading 2\n### heading 3', {renderer: renderer}));
