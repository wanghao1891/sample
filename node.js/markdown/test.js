var marked = require('marked');

marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: true, //new line by \n
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
});
var renderer = new marked.Renderer();
renderer.heading = function(text, level, raw, origin) {
    console.log('arguments:', arguments);
    return origin;
};
renderer.paragraph = function(text) {
    return '<br><br>' + text;
};

var $scope = {
    //content: 'line 1\nline 2\nline 3'
    content: 'line 1\n\nline 2\n\nline 3'
};
console.log('origin:', $scope.content);
var html = marked($scope.content, {renderer: renderer});
html = html.replace(/<p>/, '')
    .replace(/<\/p>/, '')
    .replace(/^<br><br>/, '');
console.log('html:', html);
