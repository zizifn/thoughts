# Command

## UbuntuCommand

### PROXY

- Temporary

  `sudo http_proxy='http://user:pass@proxy.example.com:8080/' apt-get install package-name`
  Sample:  
   `sudo http_proxy='http://127.0.0.1:1080/' apt-get install package-name`

- Permanently

  To set such a proxy permanently, create `/etc/apt/apt.conf.d/30proxy`  
   containing:  
   `Acquire::http::Proxy "http://user:pass@proxy.example.com:8080/";`

- CURL
  `curl -v --proxy 127.0.0.1:10801 https://google.com`

## Docker

- Command should let you explore a running docker container, refer to dokcer doc for detials,
  `docker exec -it name-of-container bash`

- This command should let you explore a docker image, refer to dokcer doc for detials,
  `docker run --rm -it --entrypoint=/bin/bash name-of-image`

## [PowerShell](./PowerShell.md)
