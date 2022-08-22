import React from 'react';
import { Provider, Page } from '@ucloud-fe/recodo-doc';
import '@ucloud-fe/recodo-doc/lib/doc.css';

import { infoMap, docMap } from './recodo-gen-output';

const Doc = () => {
    return (
        <Provider content={{ docMap, infoMap } as any} scope={{ React }}>
            <Page name={'Button'} />
        </Provider>
    );
};

export default Doc;
