# Express 目录简述

## 1. `app/`

核心业务逻辑的文件夹，包含以下子目录：

- `controllers/`: 负责请求的具体处理逻辑。
- `models/`: 定义数据结构（如 MongoDB 的 Mongoose 模型）。
- `routes/`: 定义路由及其对应的控制器。
- `services/`: 封装复杂逻辑（如调用第三方 API、数据库操作）。

## 2. `public/`

存放静态文件，Express 使用 `express.static` 中间件提供服务。

示例内容：

```
public/
├── css/
├── js/
├── images/
└── index.html
```

## 3. `views/`

存放模板文件，用于动态生成 HTML 页面（如 EJS、Pug）。

示例内容：

```
views/
├── index.ejs
├── about.ejs
└── partials/
    ├── header.ejs
    └── footer.ejs
```

## 4. `config/`

管理环境相关的配置信息（如数据库连接、API 密钥）。

示例文件：

```
config/
├── database.js
└── appConfig.js
```

## 5. `middlewares/`

自定义的中间件逻辑，如身份验证、错误处理、请求日志等。

## 6. `tests/`

存放测试代码，使用工具如 Mocha、Chai 或 Jest。

示例内容：

```
tests/
├── controllers/
├── routes/
└── services/
```

## 7. `utils/`

通用的帮助函数，如日期格式化、日志记录工具、加密工具等。

## 8. `server.js`

项目入口文件，通常包含：

- Express 应用初始化。
- 加载中间件。
- 加载路由。
- 启动服务器。
