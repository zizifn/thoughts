# Drizzle

## Overview


## Drizzle Mirgration

首先需要阅读 https://orm.drizzle.team/docs/migrations， 理解什么是 Database first 和 Code first。

### 那么问题来了，怎么从 database first 迁移到 code first 呢？
1. `npx dirzzle-kit pull`
2. `npx drizzle-kit generate`

    这里需要把 `pull` 生成的 migration sql 些许改下，因为可能出现 `table exsit` error.

这样我们把数据库已有的schema 生成出来，然后还会生成一个 migration 文件. 这样后续的 migration 文件就会工作。如果直接 使用 generate 会导致一个migration 不正常。

