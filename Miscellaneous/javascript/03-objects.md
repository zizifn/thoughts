# JavaScript 中所有的对象

## 宿主对象

由 JavaScript 宿主环境提供的对象，它们的行为完全由宿主环境决定。

```js
window
window.document
etc...
```

## 内置对象

由 JavaScript 语言提供的对象

### 固有对象

随着运行时创建而自动创建的对象实例。

### 原生对象

可以由用户通过 Array 等内置构造器或者特色语法创建的对象。

### 普通对象

由{}语法，object 构造器或者 class 关键字定义类创建的对象，它能够被原型继承。