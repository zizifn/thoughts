# 为什么说 Content-Security-Policy (SCP) 还不够安全？

## Content-Security-Policy (SCP)

[MND: Content-Security-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy)

现在很多网站都已经启用了 SCP。 SCP 能够指定网站从哪些地方加载资源（`img`, `script`等）。SCP 可以有效帮助防止跨站脚本攻击（Cross-Site Script）。

下面是 github 的 SCP 设置，

```http
content-security-policy: default-src 'none'; base-uri 'self'; block-all-mixed-content; child-src github.com/assets-cdn/worker/ gist.github.com/assets-cdn/worker/; connect-src 'self' .......
```

以及如果 github.com 加载不在列表中资源的报错,

```http
Refused to load the image
'https://****.herokuapp.com/corss-origin-header/favicon.ico' because
it violates the following Content Security Policy directive: "img-src 'self'
data: github.githubassets.com identicons.github.com collector.githubapp.com
github-cloud.s3.amazonaws.com secured-user-images.githubusercontent.com/
*.githubusercontent.com".
```

SCP 仅仅是指定自己网站加载资源的范围。。但是如果**恶意网站**，使用 img 等加载其他网站资源怎么办呢？

## Cross-Origin-Resource-Policy

让我们看，我在文章 [为什么说 img 标签是 web 标准最大的失误？]() 遗留的问题。

> 很多内部网站，都是不检验 cookie 的，因为内网相对安全，那么攻击者还是可以利用下面脚本做攻击，来判断用户是否在某家公司的内网，从而造成信息泄露。
> `<img src="https://内网地址/公司logo.jpg" onload="alert(1)" />"`

因为 img 无视 CORS 设置，所以 使用 img 可以发送 http 请求给其他网站，从而根据 http response 状态来达到盗取信息的目的。我们怎么才能，不让恶意网站加载我们的资源呢？

相信大家都已经猜到了，我们需要在 http response header 中加入 [Cross-Origin-Resource-Policy](<https://developer.mozilla.org/en-US/docs/Web/HTTP/Cross-Origin_Resource_Policy_(CORP)>)

当我们在图片资源加入`Cross-Origin-Resource-Policy: same-site` http header 时候. 如果不是 same site，浏览器就不会把 http response 加载到进程中。并给出以下错误，

> 位于“https://\*\*\*.herokuapp.com/corss-origin-header/favicon.ico?Cross-Origin-Resource-Policy=same-site”的资源因其 Cross-Origin-Resource-Policy 头内容（或缺少该头）而被拦截。详见 https://developer.mozilla.org/docs/Web/HTTP/Cross-Origin_Resource_Policy_(CORP)#

同时 CORP 也同样防止了 Meltdown and Spectre 攻击，虽然发送了 http 请求，但是由于 corp 浏览器没有把 http response 加载到内存中，所有 Meltdown and Spectre 也就无法起作用。也就是下面的例子。

> `<img src="https://内网地址/员工信息.html"" onload="alert(1)" />`
> 如果内网的 html 没有 cookie 检验，虽然 img 标签无法显示拿到 html 信息，但是浏览器会把 html 加载到进程和内存中，利用 Meltdown and Spectre CPU bug 攻击 就可以拿到 html 的数据。

## COOP

如果恶意网站使用 window open

## COEP
