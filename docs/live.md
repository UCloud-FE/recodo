## recodo-live

React 实时预览编辑器

-   支持 JSX
-   支持 scope 注入
-   支持 modules 注入
-   代码错误捕获

### 安装

依赖 @ucloud-fe/recodo-compiler

```sh
npm install @ucloud-fe/recodo-compiler @ucloud-fe/recodo-live
```

### 使用

```js
import { LiveProvider, LiveEditor, LivePreview } from '@ucloud-fe/recodo-live';

const code = `
const D = () => {
    return (
        <div>
            <div>demo</div>
        </div>
    );
}
return <D />
`;

const Demo = () => {
    return (
        <LiveProvider code={code}>
            <LivePreview />
            <LiveEditor />
        </LiveProvider>
    );
};
```
