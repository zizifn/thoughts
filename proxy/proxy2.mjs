import pkg from "socksv5";
const { createServer, auth } = pkg;

var srv = createServer(function (info, accept, deny) {
  if (info.dstPort === 80) {
    var socket;
    if ((socket = accept(true))) {
      var body = "Hello " + info.srcAddr + "!\n\nToday is: " + new Date();
      socket.end(
        [
          "HTTP/1.1 200 OK",
          "Connection: close",
          "Content-Type: text/plain",
          "Content-Length: " + Buffer.byteLength(body),
          "",
          body,
        ].join("\r\n")
      );
    }
  } else accept();
});
srv.listen(8124, "localhost", function () {
  console.log("SOCKS server listening on port 1080");
});

srv.useAuth(auth.None());
