function Editor(input, preview) {
    this.marked = marked;
    this.marked.setOptions({
        renderer: new this.marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: true, //new line by \n
        pedantic: false,
        sanitize: true,
        smartLists: true,
        smartypants: false
    });

    this.renderer = new this.marked.Renderer();

    this.renderer.heading = function(text, level, raw, origin) {
        console.log('arguments:', arguments);
        return origin;
    };

    this.renderer.paragraph = function(text) {
        return '<br><br>' + text;
    };

    this.renderer.link = function(href, title, text, origin) {
        console.log('link:', href, title, text, origin);
        return origin;
    };

    this.update = function () {
        preview.innerHTML = this.marked(input.value, {renderer: this.renderer});
    };
    input.editor = this;
    this.update();
}
var $ = function (id) { return document.getElementById(id); };
new Editor($("text-input"), $("preview"));
