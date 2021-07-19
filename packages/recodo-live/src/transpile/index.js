import transform from './transform';
import errorBoundary from './errorBoundary';
import evalCode from './evalCode';

export const generateElement = ({ code = '', scope = {}, modules }, errorCallback) => {
    // NOTE: Remove trailing semicolon to get an actual expression.
    const codeTrimmed = code.trim().replace(/;$/, '');

    // NOTE: Workaround for classes and arrow functions.
    return errorBoundary(evalCode(transform(codeTrimmed), scope, modules), errorCallback);
};

export const renderElementAsync = (
    { code = '', scope = {}, modules },
    resultCallback,
    errorCallback
    // eslint-disable-next-line consistent-return
) => {
    const render = element => {
        if (typeof element === 'undefined') {
            errorCallback(new SyntaxError('`render` must be called with valid JSX.'));
        } else {
            resultCallback(errorBoundary(element, errorCallback));
        }
    };

    if (!/render\s*\(/.test(code)) {
        return errorCallback(new SyntaxError('No-Inline evaluations must call `render`.'));
    }

    evalCode(transform(code), { ...scope, render }, modules);
};
