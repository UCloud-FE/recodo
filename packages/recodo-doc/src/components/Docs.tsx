import React, { useContext } from 'react';
import ReactMarkdown from 'react-markdown';

import _ErrorBoundary from '../ErrorBoundary';
import { docCls } from './cls';
import { CodeContext } from './Code';
import { DocContext } from './Provider';

const ErrorBoundary = _ErrorBoundary as any;

const Docs = ({ name, subName }: { name: string; subName?: string }) => {
    const { docMap, components } = useContext(DocContext);
    const docInfo = docMap?.[name]?.[subName || name]?.info;

    return (
        <ErrorBoundary>
            <div className={docCls}>
                <CodeContext.Provider value={{ name, subName }}>
                    <ReactMarkdown components={components}>{docInfo}</ReactMarkdown>
                </CodeContext.Provider>
            </div>
        </ErrorBoundary>
    );
};

export default Docs;
