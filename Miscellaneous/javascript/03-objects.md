# JavaScript中所有的对象

## 宿主对象

由JavaScript宿主环境提供的对象，它们的行为完全由宿主环境决定。

```js
window
window.document
etc...
```

## 内置对象

由JavaScript语言提供的对象

### 固有对象

随着运行时创建而自动创建的对象实例。

### 原生对象

可以由用户通过Array等内置构造器或者特色语法创建的对象。

### 普通对象

由{}语法，object构造器或者class关键字定义类创建的对象，它能够被原型继承。