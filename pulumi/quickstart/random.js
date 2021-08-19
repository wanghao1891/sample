// https://www.pulumi.com/docs/intro/concepts/resources/#dynamicproviders

let pulumi = require("@pulumi/pulumi");
let crypto = require("crypto");
let fs = require("fs");

let randomprovider = {
    async create(inputs) {
        fs.writeFileSync("/Users/hao/tmp/pulumi.out", "hello, world!", "utf-8");
        return { id: crypto.randomBytes(16).toString('hex'), outs: {id: crypto.randomBytes(16).toString('hex')}};
    }
};

class Random extends pulumi.dynamic.Resource {
    constructor(name, opts) {
        super(randomprovider, name, {}, opts);
    }
}

exports.Random = Random;
