# Async/await

## 生成器 VS 协程

### 生成器

如果用java来实现，就需要来一个Class, 来记住哪一次调用。

``` js
function *genDemo() {

    let i = 0;
    while (true) {
        yield i++;
    }
}

console.log('main 0')
let gen = genDemo()
console.log(gen.next().value) // 0
console.log(gen.next().value) // 1
console.log(gen.next().value) // 2
console.log(gen.next().value) // 3

```

``` java
public class CountNumber {

    public static void main(String[] args) {

//        for( int i : new CountIterable(10)){
//            System.out.println(i);
//        }

        CountIterable integers = new CountIterable(10);
        Iterator<Integer> iterator = integers.iterator();
        System.out.println(iterator.next());
        System.out.println(iterator.next());
        System.out.println(iterator.next());

    }

    public static class CountIterable implements Iterable<Integer>{

        private CountIterator countIterator;
        private int num = 0;

        public CountIterable(int num){
            this.num = num;
            countIterator = new CountIterator(num);
        }
        @Override
        public Iterator<Integer> iterator() {
            return new Iterator<Integer>(){ // java 用一个类来保存状态。。

                private int count = 0;
                @Override
                public boolean hasNext() {
                    return count <= num;
                }

                @Override
                public Integer next() {
                    return count++;
                }
            };
        }
    }
}
```

### 协程


## 用实际code理解async / await

下面code输出的结果是，

 1. script start
 2. bar start
 3. foo
 4. promise executor
 5. script end
 6. promise then
 7. setTimeout


``` js
async function foo() {
    console.log('foo start')
    await 100
    console.log('foo start')
}
async function bar() {
    console.log('bar start')
    await foo()
    console.log('bar end')
}
console.log('script start')
setTimeout(function () {
    console.log('setTimeout')
}, 0)
bar();
new Promise(function (resolve) {
    console.log('promise executor')
    resolve();
}).then(function () {
    console.log('promise then')
})
console.log('script end')

```