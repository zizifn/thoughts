import net from "node:net";
import { Duplex, Readable } from "node:stream";
const server = net.createServer();
import { fetch, Client } from "undici";
let i = 0;
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

    // clientToProxySocket.on("data", function (data) {
    //   console.log(
    //     "%s:%d - writing data to remote",
    //     clientToProxySocket.remoteAddress,
    //     clientToProxySocket.remotePort
    //   );
    //   var flushed = remotesocket.write(data);
    //   if (!flushed) {
    //     console.log("  remote not flushed; pausing local");
    //     localsocket.pause();
    //   }
    // });

    const {
      readable: clientToProxySocketReadable,
      writable: clientToProxySocketWritable,
    } = Duplex.toWeb(clientToProxySocket);
    const chunks = [];
    for await (const chunk of clientToProxySocketReadable) {
      chunks.push(...chunk);
      // console.log(chunk);
    }
    // chunks.map;

    const data = {
      async *[Symbol.asyncIterator]() {
        const reader = clientToProxySocketReadable.getReader();
        let index = 0;
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            return;
          }
          yield value;
        }
      },
    };

    // fetch("https://zizi.press:8888/api/proxy", {
    // fetch("http://zizi.press:3400/api/proxy", {
    // fetch("https://vercel.zizi.press/api/proxy2", {
    //   // fetch("https://vercel.zizi.press/api/proxy", {
    //   // fetch("http://localhost:3000/api/proxy2", {
    //   headers: {
    //     "x-host": serverAddress,
    //     "x-port": serverPort,
    //     "Content-Type": "text/plain",
    //     "x-count": `${i++}`,
    //   },
    //   method: "POST",
    //   body: clientToProxySocketReadable,
    //   duplex: "half",
    // })
    //   .then(async (resp) => {
    //     console.log(resp.status, resp.headers);
    //     // resp.body.pipeTo(clientToProxySocketWritable).catch((error) => {
    //     //   console.log("pipe to", error);
    //     // });

    //     for await (const chunk of resp.body) {
    //       console.log(chunk);
    //     }
    //   })
    //   .catch((error) => {
    //     console.log("fetch error", error);
    //   });

    // let proxyToServerSocket = net.createConnection(
    //   {
    //     host: serverAddress,
    //     port: serverPort,
    //   },
    //   () => {
    //     console.log("PROXY TO SERVER SET UP");
    //     if (isTLSConnection) {
    //       clientToProxySocket.write("HTTP/1.1 200 OK\r\n\n");
    //     } else {
    //       proxyToServerSocket.write(data);
    //     }

    //     clientToProxySocket.pipe(proxyToServerSocket);
    //     proxyToServerSocket.pipe(clientToProxySocket);

    //     proxyToServerSocket.on("error", (err) => {
    //       console.log("PROXY TO SERVER ERROR");
    //       console.log(err);
    //     });
    //   }
    // );

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
