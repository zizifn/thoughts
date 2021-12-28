# 为什么说 img 标签是 web 标准最大的失误？

等等，我不仅仅指 `img`， 我是说下面的各位都是设计失误。

```html
<img src="https://example.com/23333" />
<script src="https://example.com/233"></script>
<link rel="stylesheet" href="https://example.com/233" />
<video src="https://example.com/233"></video>
<audio src="https://example.com/233"></audio>
<form action="https://example.com/233"></form>
```

为什么这样说，因为他们都无视 `cors`， 并且会携带 `Cookie`。 这就给了**恶意网站**盗取信息的机会。

## 危害

大家或许都熟悉，script 和 form 可以做 XSS 攻击，是非常恐怖的。

那么可以利用 `img` 标签做些什么呢？下面的例子，我们可以判断用户是否登录某些网站？ 或者判断用户是否在企业内网？

```html
<img src="https://example.com/account" onload="alert(1)" />
<img src="https://内网地址/json" onload="alert(1)" />
```

哎呀，等等。这算什么严重攻击啊，img 只能请求 img 啊，我们的数据一般都存在 json 里面，img 读不到啊。

### CPU 架构 bug 攻击 Meltdown and Spectre

[Meltdown and Spectre](https://meltdownattack.com/)

Meltdown and Spectre 是利用现代 CPU 会读多余缓存的特性，从而读取其他程序的数据。

虽然 `img` 标签不能返回 json 数据给恶意网站的 javascript，但是浏览器已经把 json 加载到内存中，所以攻击者可以利用 Meltdown and Spectre 从而设计精妙的 js 程序拿到数据。

那么 `web标准` 为什么要这样设计呢？首先我们要看 web 是怎么一步步发展到现在这个样子的？

## 追根溯源

### 1993 年 Mosaic 浏览器

1993 年， Mosaic 浏览器将下面的语法，带到了浏览器。

```html
<img src="foo.jpg" />
```

这大概是网页第一次可以拿到 sub resource。这意味着什么呢？这意味的网页没有必要把所有的资源一次返回给浏览器，后续资源，浏览器会根据 html 在发网络请求。这是 web 的起点和基石。

**这是跨时代的进步。**

然后下面的语法也是可以的，注意这个 img 标记可以无条件跨域哦， _失误也就从此开始_。 但是当时这并不是一个问题，因为 cookie 还不存在。

```html
<img src="https://example.com/foo.jpg" />
```

### 1994 年 netscape 浏览器引入 cookie

1994 年 netscape 浏览器 引入 cookie。然后 cookie 的引入也是必须的，http 是无状态的，但是 login 又需要状态，所有 cookie 就出现了。

```html
Set-Cookie: foo=bar
```

### 1995 年，netscape 浏览器引入了 script

随后 netscape 又在浏览器支持了 script。然后失误也就正式登场，script 标签不在乎跨域，并且携带 cookie。这个失误也延续到 `img`,`iframe`, `link`, `video`, `audio`, `form` 标签上。

```html
<script src="https://example.com/233"></script>
```

按照这样发展，如果浏览器要支持，异步请求数据(xml/json etc)，那么也会同样不在乎跨域并且携带 cookie？如果这样那么整个 web 都将不复存在。

### 1999 年，Microsoft.XMLHTTP

事情逐渐好了起来，1999 年，微软引入 Microsoft.XMLHTTP 在异步请求。但是此时的异步请求都局限在 same origin。

```javascript
new ActiveXObject("Microsoft XMLHTTP");
```

### 2008 年， cross origin 被标准化

历时 9 年，跨域请求终于被正式的被引入到 web，并作了标准化。

```javascript
var oReq = new XMLHttpRequest();
oReq.withCredentials = true; //如果相加 cookie， 必须明确指明
oReq.addEventListener("load", reqListener);
oReq.open("GET", "http://www.example.org/example.txt");
oReq.send();
```

标准规定，浏览器会实现这个标准，如果你想让自己（www.example.org） 的资源被其他网站使用，你必须使用[CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS). 这就是我们都熟悉的`Access-Control-Allow-*` 一系列的 header。

从此以后，整个 web 标准，逐渐的好起来。

但是为了 **web 兼容性**，`img`, `iframe`, `link`, `video`, `audio`, `form` 等 并不遵循 CORS。攻击者还是可以利用 `img` 携带 cookie 并且忽略 CORS 设置，从而达到信息泄露。

到此为止，`img` etc 仍然是 web 设计的最大的失误。

与此同时，跨站攻击（CSRF）也随着 CORS 流行成为很重要的攻击方式。为了防范 CSRF， 一般网站会使用 token 等方式进行防护。然后在一切的防护大概是因为 web 的跨域请求标准不完美的体现！！

## 逐渐完美，SameSite Cookie

Cookie 的 SameSite 设置， 可以让跨站请求无法携带 cookies。

```html
Set-Cookies: sessionid=test111; SameSite=Lax
```

SameSite cookies 不仅作用在，ajax 请求，还作用在 `img`, `iframe`, `link`, `video`, `audio`, `form`。从而从根本上解决问题， 包括 CSRF。 再也不需要 CSRF token 了。

> 注意 SameSite 的判断和 same origin 的判断条件不一样。

SameSite 有很多选项，严谨的解释，请参考 MDN。[SameSite](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite)

随着浏览器不断激进措施，也许未来一两年，所有浏览器会让跨站请求都无法携带 cookies，除非网站所有者强制说明可以跨站`SameSite=None`。

## 还有一些问题没有解决？

很多内部网站，都是不检验 cookie 的，因为内网相对安全，那么攻击者还是可以利用下面脚本做攻击，来判断用户是否在某家公司的内网，从而造成信息泄露。

```html
<img src="https://内网地址/公司logo.jpg" onload="alert(1)" /> //corp
```

还有下面的问题，

```html
<img src="https://内网地址/员工信息.html"" onload="alert(1)" /> //corb
```

如果内网的 html 没有 cookie 检验，虽然 img 标签无法显示拿到 html 信息，但是浏览器会把 html 加载到进程和内存中，利用 Meltdown and Spectre CPU bug 攻击 就可以拿到 html 的数据。

解决方案是什么呢？买个关子，下一篇来带你来看，web 标准是如何解决这些问题的？包括 Meltdown and Spectre 攻击。

> 实际上 Meltdown and Spectre 攻击的最终解决方案，是 CPU 架构的重新设计，但是这可不是几年能完成的，因为现在 CPU 的数量太多了。

> 如果错误，请大家指正。

## Cross-Origin-Resource-Policy
