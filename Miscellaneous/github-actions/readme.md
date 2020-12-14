# Github Actions 的简单介绍

Github Actions 是 github 官方的 workflows, 用来实现 CI/CD。
当然先看[官方文档](https://docs.github.com/en/free-pro-team@latest/actions)，Actions 配置文件使用的是 `yml`, 官方有 syntax 的文档。

```text
如果你使用过 Jenkins 一类的工具，基本可以看着文档上手。
像这种顶级项目，文档写的都是很好的。
```

## 使用 workflows

在项目的 `.github\workflows` 文件中创建 `yml` 文件。名字无所谓，但是要符合语法。然后再网站的 Actions 下就可以看到。
也可以通过网站引导创建，不要重复造轮子，可以使用别人创建好的 Actions. [marketplace](https://github.com/marketplace?type=actions)

本项目也有几个 workflows 例子:

- check in 时候 lint MD
  .github\workflows\main.yml
- 一个测试自定义 Actions 的例子
  .github\workflows\shell.yml

## 如何制作自己的 Github Actions

官方文档 https://docs.github.com/en/free-pro-team@latest/actions/creating-actions

### 感悟

好吧，下面就写下，我自己创建 Actions 的疑惑吧。

- Actions 里面怎么 output variable，给下一个 job
  官方例子里面有。actions 运行是有 context 的。看文档。

  - https://docs.github.com/en/free-pro-team@latest/actions/reference/environment-variables
  - https://docs.github.com/en/free-pro-team@latest/actions/reference/workflow-commands-for-github-actions#setting-an-environment-variable

- 一个简单的自定义的 Actions
  就是简单的把自定义的 actions 中 `shell` 文件 copy 到项目 build 根目录。这样使用这个 Action 的 workflow 就可以使用这个 `shell` 文件。
  [参考例子](.github\actions\action.yml)

  ```yml
  - name: copy files
    run: cp ${{ github.action_path }}/module.ps1 . # share script to user
    shell: bash
  ```

  - 使用这个 action 的 workflow 例子

  ```yml
  - id: foo
    uses: ./.github/actions
    with:
      who-to-greet: "Mona the Octocat"
  - name: run pwsh script file from action
    shell: pwsh
    run: |
      . ./module.ps1
      Show-Calendar
      Show-Calendar3
      Show-Calendar2
  ```

- 怎么测试自定义的 Action
  可以不用上传的 marketplace。可以用自己的 workflow 直接引用自己的 actions。目录再什么地方无所谓，但是目录下一定要有 `actions.yml` 文件。

  ```yml
  - id: foo
    uses: ./.github/actions
    with:
      who-to-greet: "Mona the Octocat"
  ```

- Actions 可以使用很多 `shell`
  - https://docs.github.com/en/free-pro-team@latest/actions/reference/workflow-syntax-for-github-actions#using-a-specific-shell
