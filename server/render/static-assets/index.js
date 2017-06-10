/* eslint no-undef: 0*/
const createStaticAssets = __PRODUCTION__ ? require('./prod') : require('./dev');

export default createStaticAssets;
