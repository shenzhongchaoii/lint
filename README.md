# @tttiga/lint

## 介绍

用于集成 eslint、prettier、stylelint、lint-staged、husky、commitlint 配置文件、添加 lint scripts 命令等的自定义指令

#### 安装

```bash
# npm
npm install @tttiga/lint@latest

# yarn
yarn global add @tttiga/lint@latest

# pnpm
pnpm add @tttiga/lint@latest
```

### 补充 npm script 命令

```json
{
  // ....
  "scripts": {
    // ...
    "lint:install": "tttiga-lint install"
    // ...
  }
  // ...
}
```

### 执行 tttiga-lint install

#### 添加 lint 配置文件、scirpts 命令

```bash
# npm
npm run lint:install

# yarn
yarn run lint:install

# pnpm
pnpm lint:install
```

#### prettier 校验及格式化

```bash
# npm
npm run lint:prettier

# yarn
yarn run lint:prettier

# pnpm
pnpm lint:prettier
```

#### eslint 校验

```bash
# npm
npm run lint:eslint

# yarn
yarn run lint:eslint

# pnpm
pnpm lint:eslint
```

#### stylelint 校验

```bash
# npm
npm run lint:stylelint

# yarn
yarn run lint:stylelint

# pnpm
pnpm lint:stylelint
```

#### lint-staged 校验（校验 git add 文件列表）

```bash
# npm
npm run lint:lint-staged

# yarn
yarn run lint:lint-staged

# pnpm
pnpm lint:lint-staged
```
