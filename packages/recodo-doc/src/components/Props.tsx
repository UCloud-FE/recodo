import Highlight, { Prism, PrismTheme } from 'prism-react-renderer';
import React, { useContext } from 'react';
import nightOwlLight from 'prism-react-renderer/themes/nightOwlLight';

import { propsCls, propsTableCls, propsTableDeprecatedCls, propsTableDescTagTitleCls, propsTableWrapCls } from './cls';
import { DocContext } from './Provider';
import _ErrorBoundary from '../ErrorBoundary';
import { Hn } from './Components';

const ErrorBoundary = _ErrorBoundary as any;

const highlightCode = (code: any, language: any) =>
    code ? (
        <Highlight Prism={Prism} code={code} theme={nightOwlLight as PrismTheme} language={language}>
            {({ tokens, getLineProps, getTokenProps }) => (
                <>
                    {tokens.map((line, i) => (
                        <div key={i} {...getLineProps({ line, key: i })}>
                            {line.map((token, key) => (
                                <span key={key} {...getTokenProps({ token, key })} />
                            ))}
                        </div>
                    ))}
                </>
            )}
        </Highlight>
    ) : null;

const Type = (prop: any) => {
    const { tsType, type } = prop;
    const res = (() => {
        if (tsType) {
            switch (tsType.name) {
                case 'signature':
                case 'union':
                case 'Array':
                    return highlightCode(tsType.raw, 'typescript');
                case 'literal':
                    return highlightCode(tsType.value, 'typescript');
                default:
                    return tsType.name;
            }
        }
        return highlightCode(type?.name, 'javascript');
    })();
    return res || '';
};

const Description = (prop: any) => {
    const { description } = prop;
    return (
        <>
            <div>{description?.description}</div>
            {description?.tags?.map((tag: any, i: any) => (
                <div key={i}>
                    <div className={propsTableDescTagTitleCls}>@{tag.title}</div>
                    {tag.description}
                </div>
            ))}
        </>
    );
};

const getTags = (description: { tags: any[] }): { deprecated?: true; ignore?: true } => {
    const tags: any = {};
    description?.tags?.forEach(tag => {
        tags[tag.title] = true;
    });
    return tags;
};

const Props = ({ name, subName }: { name: string; subName?: string }) => {
    const { infoMap } = useContext(DocContext);

    const info = infoMap?.[name]?.[subName || name]?.info;
    const props = info?.props || {};
    const propKeys = Object.keys(props);

    if (!propKeys.length) return null;

    return (
        <ErrorBoundary>
            <div className={propsCls}>
                <Hn level={3}>props</Hn>
                <div className={propsTableWrapCls}>
                    <table className={propsTableCls}>
                        <colgroup>
                            <col style={{ width: '100px' }} />
                            <col style={{ width: '200px' }} />
                            <col style={{ width: '80px' }} />
                            <col style={{ width: '80px' }} />
                            <col />
                        </colgroup>
                        <thead>
                            <tr>
                                <th>Prop Name</th>
                                <th>Type</th>
                                <th>Required</th>
                                <th>Default</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {propKeys.map(key => {
                                const prop = props[key];
                                const { required, defaultValue, description } = prop;
                                const tags = getTags(description);
                                if (tags.ignore) return null;
                                return (
                                    <tr key={key} className={tags.deprecated ? propsTableDeprecatedCls : ''}>
                                        <td>{key}</td>
                                        <td>
                                            <Type {...prop} />
                                        </td>
                                        <td>{required ? 'required' : ''}</td>
                                        <td>{defaultValue?.value}</td>
                                        <td>
                                            <Description {...prop} />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </ErrorBoundary>
    );
};

export default Props;
