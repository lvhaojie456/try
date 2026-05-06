# Cloudflare 部署与 D1 配置

这个项目需要用 Cloudflare Pages + Pages Functions + D1。不要只用 Dashboard 的拖拽上传，因为拖拽上传不会编译 `functions` 目录里的 API。

## 1. 进入项目目录

```powershell
Set-Location "D:\Downloads\try"
```

## 2. 登录 Wrangler

```bash
npx wrangler login
```

## 3. 创建 D1 数据库

```bash
npx wrangler d1 create arcane-quest-db
```

把命令输出里的 `database_id` 填到 `wrangler.toml`：

```toml
[[d1_databases]]
binding = "DB"
database_name = "arcane-quest-db"
database_id = "你的 database_id"
```

## 4. 初始化远程数据库表

```bash
npx wrangler d1 execute arcane-quest-db --remote --file=./schema.sql
```

如果你的数据库已经创建过旧版 `users` 表，请只运行一次密码字段迁移。已有用户会先使用默认密码 `123456`：

```bash
npx wrangler d1 execute arcane-quest-db --remote --file=./migrations/0001_add_passwords.sql
```

## 5. 本地用 Cloudflare Pages Functions 测试

先初始化本地 D1：

```bash
npx wrangler d1 execute arcane-quest-db --local --file=./schema.sql
```

如果本地也有旧版数据库，同样只运行一次：

```bash
npx wrangler d1 execute arcane-quest-db --local --file=./migrations/0001_add_passwords.sql
```

再启动 Pages 本地环境：

```bash
npx wrangler pages dev . --d1 DB=<你的 database_id>
```

打开终端里显示的本地地址，通常是 `http://localhost:8788`，测试注册和排行榜。

## 6. 创建 Pages 项目

第一次发布前创建 Pages 项目：

```bash
npx wrangler pages project create arcane-quest
```

如果提示 production branch，可以填 `main` 或 `production`。

## 7. 发布到 Cloudflare Pages

```bash
npx wrangler pages deploy . --project-name arcane-quest
```

发布成功后，终端会给你一个 `*.pages.dev` 地址。

## 8. 以后更新网站

修改文件后再次运行：

```bash
npx wrangler pages deploy . --project-name arcane-quest
```

如果页面能打开但注册/排行榜报 `DB 尚未配置`，去 Cloudflare Dashboard 的 Pages 项目设置里检查 D1 binding：变量名必须是 `DB`，数据库选择 `arcane-quest-db`，然后重新部署。
