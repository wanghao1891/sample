#!/usr/bin/env node
var Options = require('obfuscator').Options;
var obfuscator = require('obfuscator').obfuscator;
var fs = require('fs');

//var options = new Options(
//    require('./files'),
//    '/Users/huangling/wanghao/tmp/lcweb',
//    'app.js',
//    '/Users/huangling/wanghao/tmp/lcweb/lcweb.js'
//);

var options = new Options(
    ['./index.js'],
    './',
    'index.js',
    './a.js'
);

//
//var files = require('./files');
////var files = ['./index.js'];
//var root = '/Users/huangling/wanghao/tmp/lcweb';
////var root = './';
//var entry = 'app.js';
////var entry = 'index.js';
//var dest = '/Users/huangling/wanghao/tmp/lcweb/lcweb.js';
////var dest = './a.js';
//var options = new Options(files, root, entry, true);

// custom compression options
// see https://github.com/mishoo/UglifyJS2/#compressor-options
options.compressor = {
    conditionals: true,
    evaluate: true,
    booleans: true,
    loops: true,
    unused: false,
    hoist_funs: false
};

obfuscator(options, function (err, obfuscated) {
    if (err) {
        console.log(err);
        throw err;
    }
    fs.writeFile(dest, obfuscated, function (err) {
        if (err) {
            throw err;
        }

        console.log('cool.');
    });
});
