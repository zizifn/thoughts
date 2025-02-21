# 从 0 写个微小的 Javascript 运行时(06) -添加 setTimeout

## 代码

https://github.com/zizifn/toy-js-runtime/blob/part5-add-ffi

> 代码一般会按照一篇文章一个branch。这样方便大家查看。

## libffi

libffi 是一个 C 库，提供了一个外部函数接口（FFI），允许程序调用其他编程语言编写的函数。它提供了一种跨语言调用函数的机制，使得不同语言之间可以进行互操作。

简单的来说，如果我们有了 libffi，我们就可以在 JS 里面调用 C 函数了。那么众多的模块和库也可以通过这个机制被集成到我们的 Javascript 运行时中。

> 请查看官网，https://sourceware.org/libffi/。libffi 被太多项目 python， JDK etc 使用了。


## quickjs ffi 模块

这里利用使用 https://github.com/shajunxing/quickjs-ffi 库，它把 libffi 封装成了一个 quickjs 模块。

新建一个模块 `module_quickjs_ffi.c`, 然后把 shajunxing 项目中的代码 copy 进来。

[详细代码](https://github.com/zizifn/toy-js-runtime/blob/part5-add-ffi/src/module_quickjs_ffi.c
)

最后修改main函数，加入下面代码。
``` c
int main(int argc, char **argv)
{
        // custom module
    js_init_module_test(ctx, "toyjsruntime:test");
    // 加载 FFI 模块
    js_init_module_ffi(ctx, "toyjsruntime:ffi");
    ......
}

```

### JS interface

为了更好的在 JS 里面使用，我们仍然需要更好的 JS 接口。当然，shajunxing 的项目已经提供了一个 JS module 了。

[详细代码](https://github.com/zizifn/toy-js-runtime/blob/part5-add-ffi/src/bundles/quickjs-ffi.js
)
``` javascript
import * as ffi from 'toyjsruntime:ffi';

export class CCallback {
}
```
但是这里有一个问题？我们怎么把这个 js module 预先加载到 quickjs 里面呢？当然有很多方法，下面我们采用 quickjs compile 的方式。

## quickjs compiler

Quickjs compiler 是一个可以把 js 代码编译成 quickjs VM 可以识别的 bytecode。Quickjs 项目提供了一个 [qjsc.c](https://github.com/quickjs-ng/quickjs/blob/master/qjsc.c)。 我们需要 copy 过来，然后把 `toyjsruntime:ffi` 加载进去就可以了。

[详细代码](https://github.com/zizifn/toy-js-runtime/blob/part5-add-ffi/src/toyjsruntimec.c
)

基于 `qjsc.c` 创建一个 `toyjsruntimec.c` 文件。然后加入`toyjsruntime:ffi`，避免 compile js 遇到 `toyjsruntime:ffi` 无法识别。

``` c
....
    namelist_add(&cmodule_list, "bjson", "bjson", 0);
// 添加 ffi 模块
    namelist_add(&cmodule_list, "toyjsruntime:ffi", "ffi", 0);

```
## 修改 CMakeLists.txt

### 添加 libffi

使用下面命令安装 libffi-dev 依赖。
``` shell
sudo apt install libffi-dev
```

然后修改 `CMakeLists.txt`，添加 libffi 的编译选项。

``` cmake
find_library(FFI_LIB NAMES libffi ffi REQUIRED)

target_link_libraries(toyjsruntime PRIVATE m qjs uv ${FFI_LIB})

```

### 添加 toyjsruntimec target

添加一个 toyjsruntimec target，用来生成编译器可执行文件。

``` cmake
......
add_executable(toyjsruntimec ${CMAKE_SOURCE_DIR}/src/toyjsruntimec.c)
target_link_libraries(toyjsruntimec PRIVATE m qjs)

```

### build

重新build，用来得到 `toyjsruntimec`

```bash
mkdir build
cd build
cmake ..
make
```

## 把 JS module 编译成 bytecode
 
具体参考可以 quickjs 网站 https://quickjs-ng.github.io/quickjs/cli

``` bash
./toyjsruntimec -o ../src/bundles/quickjs-ffi.c ../src/bundles/quickjs-ffi.js
```

## 自定义 JS_SetModuleLoaderFunc

好了，这样我们已经有一个纯粹的 JS module 的 bytecode 了。

接下来我们需要把它预先加载到 quickjs 里面。因此需要修改加载 module 的函数。

下面代码主要是，自定义模块加载函数，然后如果是js module，就直接加载编译后的 bytecode 的。

``` c
typedef struct
{
    const char *name;
    const uint8_t *data;
    uint32_t data_size;
} builtin_js_t;

// 定义一个内置模块的数组，都是用 quickjs 编译的 js 文件
static builtin_js_t builtins[] = {
    {"toyjsruntime:jsffi", qjsc_quickjs_ffi, qjsc_quickjs_ffi_size}};

JSModuleDef *js_custom_module_loader(JSContext *ctx,
                                     const char *module_name, void *opaque)
{
    builtin_js_t *item = NULL;
    for (int i = 0; i < sizeof(builtins) / sizeof(builtin_js_t); i++)
    {
        if (strcmp(module_name, builtins[i].name) == 0)
        {
            item = &builtins[i];
            break;
        }
    }
    if (item != NULL)
    {
        // 加载 btyecode
        JSValue obj = JS_ReadObject(ctx, item->data, item->data_size, JS_READ_OBJ_BYTECODE);
        if (JS_IsException(obj))
        {
            JS_ThrowReferenceError(ctx, "Error loading module %s\n", module_name);
            JS_FreeValue(ctx, obj);
            return NULL;
        }

        if (JS_VALUE_GET_TAG(obj) != JS_TAG_MODULE)
        {
            JS_ThrowReferenceError(ctx, "loaded %s, butis not a modules\n", module_name);
            JS_FreeValue(ctx, obj);
            return NULL;
        }
        // 得到模块
        JSModuleDef *m = JS_VALUE_GET_PTR(obj);
        JS_FreeValue(ctx, obj);
        return m;
    }

    return js_module_loader(ctx, module_name, opaque);
}

int main(int argc, char **argv)
{
    ......
    JS_SetModuleLoaderFunc(rt, NULL, js_custom_module_loader, NULL);
    ......
}
```

## 测试

我这里创建一个简单的 `libtest_lib.so` 文件。示例源代码如下。
[详细代码]（https://github.com/zizifn/toy-js-runtime/blob/part5-add-ffi/src/example/test-lib.c）

``` c
#include <stdint.h>
#include <stdio.h>

void test1() {
    printf("Hello\n");
}
```

创建一个 ffi-test.js。[详细代码]（https://github.com/zizifn/toy-js-runtime/blob/part5-add-ffi/src/example/test-ffi.js）

``` javascript
import { CCallback } from 'toyjsruntime:jsffi';

const test1 = new CFunction('./libtest_lib.so', 'test1', null, 'void');
test1.invoke(); // 这里会调用 C 函数
```

具体详细的用法，比如如何传递参数/srtuct/指针等，请查看项目例子代码。

好了，这样我们的 toyjsruntime 就有了 ffi 的功能。我们就可以调用任何 C 库了。

下一节，我们利用 ffi 来把 UI 加入到我们的 toyjsruntime 里面。