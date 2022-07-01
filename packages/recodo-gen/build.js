const chokidar = require('chokidar');

const { updateHandle } = require('./libs');

module.exports = scope => {
    const watcher = chokidar
        .watch(scope.componentPath)
        .on('add', _path => updateHandle(_path, scope))
        .on('change', _path => updateHandle(_path, scope))
        .on('ready', () => {
            watcher.close();
        });
};
