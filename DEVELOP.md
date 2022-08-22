## 包管理器

pnpm

## 开发准备

```sh
pnpm i
```

## 调试

### compiler

需要构建后使用 examples 调试

### live

需要构建后使用 examples 调试

### gen

使用 `pnpm run test --filter recodo-gen` 查看 recodo-gen 目录下的 output 内容

### doc

需要构建后使用 examples 调试

### examples

`pnpm run dev --filter examples` 运行

### 构建

compiler、live、doc 通过 `pnpm run build --filter {project}` 构建

## 发布

1. 构建要发布的项目
2. 通过 `pnpm run publish` 自动发布
