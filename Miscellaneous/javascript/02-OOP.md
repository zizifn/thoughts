# JavaScript是面向对象还是基于对象

## 什么是面向对象

对象有哪些特点:

- 对象具有唯一标识性：即使完全相同的两个对象，也并非一个对象。所以一般需要override相关的方法，让对象logic相同.

    ```javascript
    var o1 = { a: 1 };
    var o2 = { a: 1 };
    console.log(o1 == o2); // false
    ```

- 对象有状态：对象具有状态，同一对象可能会处于不同状态下。

    一般实现方式是属性和方法。但是js属性。

    ```javascript
    var o = {
        d: 1,
        f: function() { // 方法也是属性
            console.log(this.d);
        }
    };
    console.log(o.f)
    ```

    JS 有两类属性，

  - property

    ```javascript
    var o = { a: 1 };
    Object.defineProperty(o, "b", {value: 2, writable: false, enumerable: false, configurable: true});
    //a和b都是数据属性，但特征值变化了
    Object.getOwnPropertyDescriptor(o,"a"); // {value: 1, writable: true, enumerable: true, configurable: true}
    Object.getOwnPropertyDescriptor(o,"b"); // {value: 2, writable: false, enumerable: false, configurable: true}
    o.b = 3;
    console.log(o.b); // 2
    ```

  - getter/setter

    ```js
    var o = { get a() { return 1 } };
    console.log(o.a); // 1
    ```

- 对象具有行为：即对象的状态，可能因为它的行为产生变迁。

所以JS就是面向对象。

## 模拟类

所以在js中不需要模拟类，类不是面向对象的全部。让我们先抛弃类，来理解js是怎么实现面向对象的吧。。

### 什么是原型

基于prototype的面向对象系统是通过复制的方式创建新对象，一些语言的实现，还允许复制一个空的对象，这实际上就是创建一个全新的对象。

```js
  var o = { get a() { return 1 } };
  var o1 = Object.create(o);
  console.log(o === o1) // false
  console.log(o.constructor === o1.constructor) // true

```

### JavaScript的原型

让我们抛弃js用来模拟Java类的语法。

- 所有对象都有私有字段[[prototype]],就是对象的原型
- 读一个属性，如果对象本身没有，则会继续访问对象的原型，直到原型为空或者找不到

```js
// 这就是js如何实现多态的。。
var cat = {// 注意这里是一个实例object,不是一个function/constructor
    say(){
        console.log("meow~");
    },
    jump(){
        console.log("jump");
    }
}

var tiger = Object.create(cat,  { //js可以从实例中创建实例，这正是原型的特点
    say:{
        writable:true,
        configurable:true,
        enumerable:true,
        value:function(){
            console.log("roar!");
        }
    }
})


var anotherCat = Object.create(cat);
anotherCat.say();

Object.getPrototypeOf(anotherCat) === Object.getPrototypeOf(tiger) // true
var anotherTiger = Object.create(tiger);
anotherTiger.say();

```

### 早期版本中的类与原型

需要理解js 的new，

- 以构造器prototype属性为原型，创建新的对象
- 将this和调用参数传给构造器，执行
- 如果构造器返回的是对象，则返回。else 返回第一步创建的对象。

new 这样的行为，试图让函数对象在语法上和类相似，但是，它客观上提供了两种方式，一是在构造器中添加属性，二十在构造器prototype属性上添加属性。

```js


function c1(){ // constructor
    this.p1 = 1;
    this.p2 = function(){
        console.log(this.p1);
    }
};
var o1 = new c1; // o1 is object
o1.p2();



function c2(){
};
c2.prototype.p1 = 1;
c2.prototype.p2 = function(){
    console.log(this.p1);
}

var o2 = new c2;
o2.p2();
```

TODO 其实这里或许也可以用closure类模拟property

## ES6/ES2015 中的类

new function语法上其实是很难理解的，于是ES6的类。。从此基于类的编程方式称为了js的官方编程范式。

下面代码的例子其实和java已经很类似了。。。

```js

class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(this.name + ' makes a noise.');
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name); // call the super class constructor and pass in the name parameter
  }

  speak() {
    console.log(this.name + ' barks.');
  }
}

let d = new Dog('Mitzie');
d.speak(); // Mitzie barks.
```

TODO: reference
> https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects
> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Details_of_the_Object_Model
