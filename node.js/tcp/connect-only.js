var net = require('net');

//var client = net.connect(
//  {
//    host: 'at7.worktile.com',
//    port: 443
//  }, function() { //'connect' listener
//    console.log('connected to server!');
//    client.end();
//    //client.write('world!\r\n');
//  });

let port = 10000;

let client = new net.Socket();

function start() {
  if(port === 10060) {
    port = 10000;
  } else {
    port += 1;
  }

  console.log(``);
  console.log(`--------------------- port is ${port} -------------------------`);

  client.connect({
    host: 'at.worktile.com',
    port: 4431,
    localPort: port
  });
  //, function() {
  //  console.log('connected to server!');
  //  client.end();
  //});
}

client.on('close', function(had_error) {
  console.log(`on close: had_error is ${had_error}, address is ${JSON.stringify(client.address(), null, 2)}`);
});

client.on('connect', function() {
  console.log(`on connect: ${JSON.stringify(client.address(), null, 2)}, connected to server!`);
  client.end();
});

client.on('data', function(data) {
  console.log('on data', data.toString());
  //client.end();
});

client.on('drain', function() {
  console.log(`on drain: ${JSON.stringify(client.address(), null, 2)}`);
});

client.on('end', function() {
  console.log(`on end: ${JSON.stringify(client.address(), null, 2)}`, 'disconnected from server');
  setTimeout(start, 1000);
});

client.on('error', function(error) {
  console.log(`on error: error is ${error}, address is ${JSON.stringify(client.address(), null, 2)}`);

  setTimeout(start, 1000);
});

client.on('lookup', function() {
  console.log(`on lookup ${JSON.stringify(client.address(), null, 2)}`);
});

client.on('timeout', function() {
  console.log(`on timeout ${JSON.stringify(client.address(), null, 2)}`);
});


start();
