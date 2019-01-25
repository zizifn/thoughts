# PROXY

* Temporary

    `sudo http_proxy='http://user:pass@proxy.example.com:8080/' apt-get install package-name`
    SS sample:<br/>
    `sudo http_proxy='http://127.0.0.1:1080/' apt-get install package-name`
* permanently

   To set such a proxy permanently, create `/etc/apt/apt.conf.d/30proxy` <br/>
   containing: <br/>
   `Acquire::http::Proxy "http://user:pass@proxy.example.com:8080/";`