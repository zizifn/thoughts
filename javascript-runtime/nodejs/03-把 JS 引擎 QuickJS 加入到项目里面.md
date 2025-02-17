# 从 0 写个微小的 Javascript 运行时(03) - 把 JS 引擎 QuickJS 加入到项目里面

## 代码

https://github.com/zizifn/toy-js-runtime/tree/part1-add-quick-js

> 代码一般会按照一篇文章一个branch。这样方便大家查看。

## 开发环境

这里我使用的是 WSL2 + Ubuntu。MacOS 和 windows 也可以，但是我没有实验。

### VS Code

如果用 vscode 开发C/C++，可以安装 [C/C++ Extension Pack](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools-extension-pack)

### Jetbrains Clion

个人感觉， Clion C/C++ 开发体验要比 vscode 好一些。Clion 也支持远程到 WSL2 进行开发。[Jetbrains Clion remote development](https://www.jetbrains.com/help/clion/remote-development.html)

> 这里不想挑起编辑器之争，但是 Clion 速度和 debug 比 VS Code 好一些。

## 创建一个 GIT 仓库

如果你有 Github 账号，可以直接在 Github 上创建一个仓库。然后 clone 到本地。

如果没有，可以
```bash
git init
```

## CMake

构建工具采用 CMake。

```bash
# Update package lists
sudo apt update
# Install cmake
sudo apt install cmake
# Verify installation
cmake --version
```

## 把 QuickJS 加入到项目里面

这里使用 Git Submodule 来管理 quickjs。所有的 Submodule 都统一放入到 deps 目录下。这样就不用依赖系统安装 quickjs 的开发包了。

```bash
git submodule add https://github.com/quickjs-ng/quickjs.git deps/quickjs
```

如果像使用某个版本的 quickjs，可以切换到对应的 tag。

```bash
cd deps/quickjs
git checkout tags/v0.8.0
```
可以使用 `git submodule update --init --recursive` 来初始化所有的 submodule。因为 submodule 也会有其他 submodule。

```bash
git submodule update --init --recursive
```

## 编写 CMakeLists.txt

这里需要一些简单的 CMake 知识。

如果不会，可以 https://learnxinyminutes.com/zh-cn/cmake/ 速成下，或者直接哪里不会直接问大预言模型。比如 https://www.deepseek.com/

```cmake
cmake_minimum_required (VERSION 3.10)

project (toyjsruntime C)

set(CMAKE_C_FLAGS_DEBUG "${CMAKE_C_FLAGS_DEBUG} -O0 -g -DDEBUG")


set(SRC_FILES)
# libs
## quickjs
set(QUICKJS_DIR ${CMAKE_SOURCE_DIR}/deps/quickjs)
# 一定要把这个打开，要不然没有 QJS 的额外带的标准库
set(BUILD_QJS_LIBC ON)
add_subdirectory(${QUICKJS_DIR} ${CMAKE_BINARY_DIR}/quickjs)

# 生成 toy js runtime 的执行文件
add_executable(toyjsruntime ${CMAKE_SOURCE_DIR}/src/main.c)
# link 相关 lib，这里用qjs，因为 deps/quickjs CMakeLists.txt 输出结果是 qjs
target_link_libraries(toyjsruntime PRIVATE m qjs)
```

## 编写 main.c

完整 code 请查看 [main.c](https://github.com/zizifn/toy-js-runtime/blob/part1-add-quick-js/src/main.c)

```c

    rt = JS_NewRuntime();
    ctx = JS_NewContext(rt);
    // add console
    js_std_add_helpers(ctx, argc, argv);

    char* script = "console.log(`hello world!! 1 + 2 = ${1+2}`);";
    // 执行一个 js 脚本，这里使用string， 后续可以读取文件
    ret = JS_Eval(ctx, script, strlen(script), "main", 0);
```

## 编译

```bash
mkdir build
cd build
cmake ..
make
./toyjsruntime 
``` 
如果你是使用 Clion，可以直接点击 `main.c`提示的运行按钮。

``` bash
hello world!! 1 + 2 = 3
```

好了，这样一个简单的 js runtime 就完成了。

**等等，这里有个问题啊！**

`console.log` 是怎么来的？ 
![03-1](./03-jsruntime.excalidraw.png)

[Console](https://console.spec.whatwg.org/) 是 web 标准，我们这里仅仅引入 JS 引擎 QuickJS 是满足 [ECMAScript® Language Specification - TC39](https://tc39.es/ecma262/)。 ECMA262 并没有规定 Console。

细心的读者可能发现，code 中有一行 `js_std_add_helpers(ctx, argc, argv);`。

这个函数是 quickjs lib(`#include "quickjs-libc.h"`) 额外提供的，它会把一些常用的函数添加到 JS 的 global 对象上。比如 `console.log`。

下一篇文章，我会带大家一起，看看怎么添加一个自定义的模块/库？（非 JS 引擎提供）