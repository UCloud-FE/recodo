import defineRollupConfig from '../../rollup.config.base';
import config from './package.json';

export default defineRollupConfig(config, { external: ['@ucloud-fe/recodo-compiler', '@ucloud-fe/recodo-live'] });
