import net from "node:net";
import { Duplex, Readable } from "node:stream";
const server = net.createServer();
import { fetch, Client } from "undici";
import { request } from "http";

server.on("connection", (clientToProxySocket) => {
  console.log("Client Connected To Proxy");
  // We need only the data once, the starting packet
  clientToProxySocket.once("data", async (data) => {
    // If you want to see the packet uncomment below
    console.log(data.toString());

    let isTLSConnection = data.toString().indexOf("CONNECT") !== -1;

    // By Default port is 80
    let serverPort = 80;
    let serverAddress;
    if (isTLSConnection) {
      // Port changed if connection is TLS
      serverPort = data
        .toString()
        .split("CONNECT ")[1]
        .split(" ")[0]
        .split(":")[1];
      serverAddress = data
        .toString()
        .split("CONNECT ")[1]
        .split(" ")[0]
        .split(":")[0];
    } else {
      serverAddress = data.toString().split("Host: ")[1].split("\r\n")[0];
    }

    // console.log(serverAddress);
    if (isTLSConnection) {
      clientToProxySocket.write("HTTP/1.1 200 OK\r\n\n");
    } else {
      // proxyToServerSocket.write(data);
    }

    var options = {
      host: "localhost",
      path: "/api/proxy",
      port: "3000",
      //This is the only line that is new. `headers` is an object with the headers to request
      headers: {
        "x-host": serverAddress,
        "x-port": serverPort,
        "Content-Type": "text/plain",
      },
      method: "POST",
    };
    const proxyToServerSocket = request(options).socket;
    clientToProxySocket.pipe(proxyToServerSocket);
    proxyToServerSocket.pipe(clientToProxySocket);
    proxyToServerSocket.on("error", (err) => {
      console.log("PROXY TO SERVER ERROR");
      console.log(err);
    });

    clientToProxySocket.on("error", (err) => {
      console.log("CLIENT TO PROXY ERROR");
      console.log(err);
    });
  });
});

server.on("error", (err) => {
  console.log("SERVER ERROR");
  console.log(err);
  throw err;
});

server.on("close", () => {
  console.log("Client Disconnected");
});

server.listen(8124, () => {
  console.log("Server runnig at http://localhost:" + 8124);
});
