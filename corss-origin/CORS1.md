# 为什么说 Access-Control-Allow-Origin : \* 是 almost 安全的？

**准备立个 flag，写一系列的 web 安全文章，所有的观点都是从自己工作项目实践中总结而来。**

相信大家做 CORS 设置的时候，或多或少都被告知过，不要把 Access-Control-Allow-Origin 设置成 `*`。

[MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin) 关于 `*` 说明。

> 对于不需具备凭证（credentials）的请求，服务器会以“\*”作为通配符，从而允许所有域都具有访问资源的权限。

但是如果我们去细细分析 `CORS` 你会发现 `*` 是 almost 安全。

## 对于不需要认证的 get 请求

这类资源非常常见，比如图片 etc。纯技术考虑，意味着任何 site 都可以使用，无所谓安全不安全。

## 对于需要认证的 get 请求

对于有需要认证的资源，比如 github 个人主页 `https://github.com/`，如果允许任何 site 访问，是不是就造成了信息泄露呢？

想必大家写过 CORS 请求，一般都需要 `cookies`，那么就需要添加 `credentials`.

```javascript
fetch("https://github.com/", {
  credentials: "include",
});
```

让我们在仔细阅读 MDN 说明。**对于不需具备凭证（credentials）的请求，服务器会以“\*”作为通配符从而允许所有域都具有访问资源的权限。**

这就意味着，即使我们设置成 `*` 其他 site javascript 也不能成功拿到 response。因为 credentials 必须指明 `Origin`.

> 这里有一个简单的攻击，使用 img tag 可以轻松判断用户是否在某个企业内网。 至于原因和如何防护，我们以后再说。
> `<img src="http://企业内外IP/favicon.ico" alt="" onload="alert(1);" />`

## 对于需要认证的 POST 请求

慢着，虽然其他 site javascript 拿不到 response，但是网络请求已经发出去了，这样如果是`post`请求，就会造成伤害吧？

### Preflight request

[MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#preflighted_requests)

对于 Preflight request， 浏览器首先会发送一个 `OPTIONS` 请求，这个请求不会携带 body 和 cookies， 如果 我们服务器返回 `*`， 还是会因为 credentials 的原因，导致后续的 `POST`请求发不出去。这样就不会造成任何伤害。。

```
OPTIONS /doc HTTP/1.1
Host: bar.other
Connection: keep-alive
Origin: https://foo.example


HTTP/1.1 204 No Content
Access-Control-Allow-Origin: https://foo.example
Access-Control-Allow-Methods: POST, GET, OPTIONS
Access-Control-Allow-Headers: X-PINGOTHER, Content-Type
Access-Control-Max-Age: 86400
Vary: Accept-Encoding, Origin
```

### Sample request

那么还有不触发 Preflight request POST 请求呢？ 这样不就会导致我们服务器更新数据了吗？这种情况即使你设置`Access-Control-Allow-Origin：https://foo.example`, 也是一样会更新数据的啊。

> 这里涉及到 CSRF，我们以后再聊。

所以 设置 `Access-Control-Allow-Origin : * ` 不会不安全。

> 如果错误，请大家指正。
