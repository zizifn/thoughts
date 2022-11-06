import { createServer } from "http";
import net from "node:net";

function requestListener(req, res) {
  console.log("request----");
  const headers = req.headers;
  const serverAddress = headers["x-host"];
  const remotePort = headers["x-port"];
  console.log(headers);

  try {
    // res.end();
    let proxyToServerSocket = net.createConnection(
      {
        host: serverAddress,
        port: remotePort,
      },
      () => {
        console.log("call remote--");
        req.pipe(proxyToServerSocket);
        // clientToProxySocket.pipe(proxyToServerSocket);
        proxyToServerSocket.pipe(res);
      }
    );
    proxyToServerSocket.on("error", (err) => {
      console.log("PROXY TO SERVER ERROR");
      console.log(err);
    });
  } catch (error) {
    console.log("on error", error);
  }
}

const server = createServer(requestListener);
server.listen(8080).on("listening", () => {
  console.log("listening, 8080");
});
