## recodo-doc

React 组件文档相关组件

-   props 表格
-   markdown 文档
-   demo 实时演示

### 安装

```sh
npm install @ucloud-fe/recodo-doc
```

### 使用

```js
import { Provider, Page } from '@ucloud-fe/recodo-doc';

export default () => {
    return (
        <Provider content={{ examples, docs }}>
            <Page name={'Component'} />
        </Provider>
    );
};
```


### Components

#### Docs

```tsx
import { Provider, Page } from '@ucloud-fe/recodo-doc';

export default () => {
    return (
        <Provider content={{ examples, docs }}>
            <Docs name="Component" subName="SubComponent" />
        </Provider>
    );
};
```

#### Props

```tsx
import { Provider, Page } from '@ucloud-fe/recodo-doc';

export default () => {
    return (
        <Provider content={{ examples, docs }}>
            <Props name="Component" subName="SubComponent" />
        </Provider>
    );
};
```
