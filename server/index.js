import express from 'express';
import webpack from 'webpack';
import { isDebug } from '../config/app';
import { connect } from './db';
import initPassport from './init/passport';
import initExpress from './init/express';
import initRoutes from './init/routes';
import renderMiddleware from './render/middleware';

const app = express();

connect();
initPassport();

if (isDebug) {
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackConfig = require('../webpack/webpack.config');
  const devBrowserConfig = webpackConfig({ browser: true });
  const compiler = webpack(devBrowserConfig);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: devBrowserConfig.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

initExpress(app);
initRoutes(app);

app.get('*', renderMiddleware);
app.listen(process.env.PORT || 3000);
