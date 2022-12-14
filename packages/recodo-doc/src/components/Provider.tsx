import React, { createContext, ReactNode, useEffect, useState } from 'react';

import components from './Components';

interface Content {
    docMap?: any;
    infoMap?: any;
    scope?: Record<string, any>;
    modules?: Record<string, any>;
    components?: any;
    getRemoteUrl?: (codePath: string, componentName?: string, subComponentName?: string) => string;
}

export const DocContext = createContext<Content>({});

interface ProviderProps {
    content: Content | (() => Promise<Content>);
    children: ReactNode;
    scope?: Record<string, any>;
    modules?: Record<string, any>;
    getRemoteUrl?: (codePath: string, componentName?: string, subComponentName?: string) => string;
}

const Provider = ({ content, children, scope, modules, getRemoteUrl }: ProviderProps) => {
    const [_content, setContent] = useState<Content>(() => (typeof content === 'function' ? {} : content));
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(() => (typeof content === 'function' ? true : false));

    useEffect(() => {
        let mounted = true;
        if (typeof content === 'function') {
            (async () => {
                try {
                    const result = await content();
                    if (!mounted) return;
                    setContent(result);
                } catch (error: any) {
                    console.error(error);
                    if (!mounted) return;
                    setError(error);
                } finally {
                    if (mounted) {
                        setLoading(false);
                    }
                }
            })();
        }
        return () => {
            mounted = false;
        };
    }, []);

    if (loading) {
        return <div>loading</div>;
    }
    if (error) {
        return <div>{error}</div>;
    }
    return (
        <DocContext.Provider value={{ ..._content, scope, modules, components, getRemoteUrl }}>
            {children}
        </DocContext.Provider>
    );
};

export default Provider;
