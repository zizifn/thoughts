# run script use docker
docker run --rm -v ${pwd}:/sourcedist node:10 bash /sourcedist/run.sh

docker build -t local/node-web-app .

docker run --rm -p 3000:3000 -v ${pwd}:/sourcedist -d local/node-web-app