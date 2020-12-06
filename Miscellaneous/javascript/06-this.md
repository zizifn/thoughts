# This

## 为什么要有 this

需要在对象内部使用对象的属性..

下面的例子，因为作用域和作用域链的原因，`console.log(myName)`输出的是`main method`.

``` js
var bar = {
    myName:"bar object",
    printName: function () {
        console.log(myName) // 因为作用域链是根据函数声明决定的，所有printName函数的作用域上一级是main
    }
}
function foo() {
    let myName = "foo function"
    return bar.printName // bar.printName 作用域outer是main
}
let myName = "main method"
let _printName = foo()
_printName() // "main method"
bar.printName() // "main method"

```

当然我们可以改写一个闭包的版本，

``` js
function foo() {
    let myName = "foo function"
    return function() { console.log(myName) } // 同样，因为作用域是按照函数声明的位置来的，所以myName会用foo的
}
let myName = "foo function"
let _printName = foo()
_printName() // "main method"
bar.printName() // "main method"
```

然而要解决对象内部使用对象的属性，最好的方法就是 this。

# 什么是 this

this 适合执行上下文绑定的。

## 全局执行上下文的 this

``` js
console.log(this) //取决与你的js host，在浏览器中是window
```

## 函数执行上下文的 this

``` js
function foo(){
  console.log(this) // 在浏览器中是window
}
foo()
```

### 通过函数 call/bind etc 方法设置

其实就这一种方法，其他的都是这种方式的变种。

``` js

let bar = {
  myName : "bar object",
  test1 : 1
}
function foo(){
  this.myName = "foo function"
}
foo.call(bar)
console.log(bar) // 改变了myName
console.log(myName) // myName is not defined
```

### 通过对象条用方法设置

原理是通过`call` 方法实现的。

```js

var myObj = {
  name : "myObj",
  showThis: function(){
    console.log(this)
  }
}
myObj.showThis() // {name: "myObj", showThis: ƒ}
// 等价于
myObj.showThis.call(myObj) // {name: "myObj", showThis: ƒ}

// 让我们看下，下面2行代码
var foo = myObj.showThis;
foo() // 浏览器中是window
```

我们得到，

+ 全局环境调用一个函数，函数上下文中的 this 是全局的 window 变量。

+ 通过一个对象调用内部的一个方法，该方法的执行上下文中的 this 指向对象本身，其实是通过函数的 call 方法，把对象传进去实现的。

### 通过构造函数中设置

原理也是通过`call` 方法实现的。

``` js

function CreateObj(){
  this.name = "CreateObj function"
}
var myObj = new CreateObj()//

// 等同于下面代码
var tempObj = {}
 CreateObj.call(tempObj)

```

## this 不好理解的部分

### 嵌套函数中的 this 不会从外层函数中继承

### 普通函数中的 this，默认指向全局对象 window