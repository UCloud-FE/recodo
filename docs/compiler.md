## recodo-compiler

Javascript 运行时代码编译器。

-   支持 JSX
-   支持 import、export

### 安装

```sh
npm install @ucloud-fe/recodo-compiler
```

### 使用

```js
import { transform } from '@ucloud-fe/recodo-compiler';

const code = `
class MyCom extend Component {
    render() {
        return (
            <div className='my-com'>
                my component
            </div>
        );
    }
}
`;

console.log(transform(code).code);
```

