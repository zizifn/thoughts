---
title: Callback and Promise
description: Doc for Callback and Promise
---

# Callback and Promise

## Promise

  这个没有什么好讲的。看看文档，玩玩例子。
  [Promise MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

## Callback to promise

  这个就需要`Promise`的构造函数了。 请细细查看，run sample code。
  下面例子是把`XMLHttpRequest`转成`Promise`。

  ```javascript
        function get(url) {
            return new Promise(
                (resolve, reject) => {
                    try {
                        var xmlHttp = new XMLHttpRequest();
                        xmlHttp.open('GET', url);
                        xmlHttp.onload = (ev) => {
                            resolve(xmlHttp.response);
                        }
                        xmlHttp.onerror = (err) => {
                            reject(Error("Network Error"));
                        }
                        xmlHttp.send();
                    } catch (err) {
                        console.log("err " + err);
                        reject(err)
                    }
                });
        }
  ```

## Sequencing and Paralleliism

### Sequencing

这个很简单，只需要在一个`Prmoise`的`then`里面`return`一个新的`Prmoise`就可以。

```javascript
          getJson(jsonHost + 'story.json').then(result => {
            addHtmlToPage(result.heading);
            return getJson(jsonHost + result.chapterUrls[0]);
           // document.querySelector('.spinner').style.display = 'none';
        }).then(
            (chapter) => {
                addHtmlToPage(chapter.html);
            }
        );
```

如果需要利用循环来`chain`多个`Promise`，这里面有个小坑。详情请参见[promise_sequencing.html](https://github.com/zizifn/thoughts/blob/master/Callback_Promise_obser/callback2promise.html).

Sample code 如下:

```javascript
      //需要用一个promise 把所有promise 用 then 串联起来，要不然就是并发。
        var sequence = Promise.resolve();
        getJson(jsonHost + 'story.json').then(
            story =>{
                addHtmlToPage(story.heading);
                story.chapterUrls.forEach(chapterUrl => {
                    sequence = sequence.then(
                        value =>{
                            return getJson(jsonHost + chapterUrl).then(
                                chapter =>{
                                    addHtmlToPage(chapter.html);
                                }
                            );
                        }
                    )
                });
            }
        )
```

当然这完全可以用 [Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce), 达到一样效果。

```javascript
            getJson(jsonHost + 'story.json').then(
            story => {
                addHtmlToPage(story.heading);
                story.chapterUrls.reduce(
                    (previous, current) => {
                        return previous.then(
                            () => { return getJson(jsonHost + current); }
                        ).then(
                            chapter => {
                                addHtmlToPage(chapter.html);
                            });
                    }, Promise.resolve()
                )
            }
        )
```

### Parallel

好了开始并行吧，要不然`Promise`有什么意义呢？

#### Send them all, and control order

#### Send them all, and when all are done->process

#### 类比小说 load， load 完成后，一起显示

#### Send them all and when anyone resolve->process

#### 类比小说 load， 先回来的章节，就显示
