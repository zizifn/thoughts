import { request } from "https";
const options = {
    hostname: "www.baidu.com",
    port: 443,
    path: "/img/PC_7ac6a6d319ba4ae29b38e5e4280e9122.png",
    method: "GET",
};

let startTime = console.time(`main`);

for (let index = 0; index < 40; index++) {
    startTime = console.time(`time-${index}`);
    const req = request(options, (res) => {
        console.log(`statusCode: ${res.statusCode}`);
        console.timeEnd(`time-${index}`);
        res.on("data", (d) => {
            // process.stdout.write(d);
        });
    });

    req.on("error", (error) => {
        console.error(error);
    });

    req.end();
}

console.timeEnd("main");
