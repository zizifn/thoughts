
# callback and promise

* callback to promise
* Promise
* Paralleliism and sequencing
  * sequencing
    * one by one
    这个很简单，只需要在一个`Prmoise`的`then`里面`return`一个新的`Prmoise`就可以。
    ``` js
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
    如果需要利用循环来`chain`多个`Promise`，这里面有个小坑。详情请参见[promise_sequencing.html]()
  * Paralleliism
    * send them all, and control order
    * send them all, and when all are done->process
      * 类比小说load， load完成后，一起显示。
    * send them all and when anyone resolve->process
      * 类比小说load， 先回来的章节，就显示。
