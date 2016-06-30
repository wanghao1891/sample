var net = require('net');
var crypto = require('crypto');

var n = 0;
var server = net.createServer(function(c) { //'connection' listener
  console.log('client connected');
  c.on('end', function() {
    console.log('client disconnected');
  });

  c.on('data', function(data) {
    console.log('data:', data);
    console.log('data:', data.toString('hex'));
    console.log(data.toString());
    var header = data.toString();

    var headers = header.split('\r\n');

    if(headers[0] && headers[0].indexOf('GET') == -1) {
      //var _tmp = new Buffer(0x81, 0x81, 0xee, 0xdd, 0xce, 0xfc, 0x8f);
      var _tmp = new Buffer([129, 1, 97]);
      if(n == 0) {
        c.write(_tmp, 'binary');
      } else {
        c.write('');
      }

      return;
    }

    console.log('headers:', headers);

    var key = '';
    headers.forEach(function(_header) {
      var __header = _header.split(': ');
      if(__header[1]) {
        console.log(__header[1]);
        if(__header[0] == 'Sec-WebSocket-Key') {
          key = __header[1];
        }
      }
    });

    var shasum = crypto.createHash('sha1');
    shasum.update(key + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11");
    key = shasum.digest('base64');

    var res = "HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Accept: " + key + '\r\n';

    res += '\r\n';

    console.log(res);
    c.write(res);
    //c.end();
  });
//  c.write("400 Bad Request\n");
//  c.end();

  //c.write("HTTP/1.1 200 OK\r\nServer: nginx/1.6.2\r\nDate: Thu, 09 Jun 2016 04:10:34 GMT\r\nContent-Type: application/json; charset=utf-8\r\nContent-Length: 103\r\nConnection: keep-alive\r\n");
  //c.write('\r\nhello\r\n\r\n');
  //c.end();

  //c.write('hello\r\n');
  //c.pipe(c);
});
server.listen(8124, function() { //'listening' listener
  console.log('server bound');
});
