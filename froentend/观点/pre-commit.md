# 强制 pre-commit 是否是错误的?

> 文章是草稿，需要修改。

**答案是是，甚至是邪恶，影响效率的。**

> 注意这里写的是强制，是 开发流程的一部分。

## 是什么是 git？

> 我们这里假设，现代开发都是基于 branch 的。

git 是为了存储 code change。一切阻止 commit 的流程都是低效的。

developer 需要在任何是时刻都可以 check in。

我的本地 git 就是我的 git，我的 branch 就是我的 branch，我的开发环境就是我的开发环境，请不要用你的观点 （pre-commit），**来教我怎么使用 git，怎么 commit。**

## 工程化

“你这野路子工程师，懂不懂工程化，标准的含金量啊？”

## 通过 CI 来强制标准

Pre-commit 是可以在本地 `--no-verify` skip 的? 肯本无法让 阻止 skip git hooks。

如果你想要工程化，标准化，请在 PR 时候，让 CI 跑各种检查，而不是使用 pre-commit。

我们应该通过 PR 和 CI 来和 developer 进行交流，强制项目标准，而不是把标准强加在每个人的本地开发环境上。

> 如果你的 CI 做不到，请使用 github action 或者增强自己使用的 CI。

## 开发者的安全感

我不相信有开发者喜欢强制 pre-commit。 开发者应该有随时随地 commit 的自由。让每个 commit 都是完成的，满足 pre-commit 要求是痴心妄想。

所以请删除你项目的 pro-commit，把他们移到 CI 上。

> 其他 git hook 同理
