const http = require('http');

const requestListener = function (req, res) {
    res._writeRaw(`HTTP/1.1 103 Early Hints\r\nLink: </test.js>; rel="prefetch"\r\n\r\n`, 'ascii', (err, result) => {
        // yup
      });

      setTimeout(
        ()=>{
            res.writeHead(200);
            res.end('Hello, World!');
        },
        1000
      )

}

const server = http.createServer(requestListener);
server.listen(8080);