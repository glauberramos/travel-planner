import express from 'express';
import passport from 'passport';
import session from 'express-session';
import bodyParser from 'body-parser';
import path from 'path';
import flash from 'express-flash';
import methodOverride from 'method-override';
import gzip from 'compression';
import helmet from 'helmet';
import unsupportedMessage from '../db/unsupportedMessage';
import { sessionSecret } from '../../config/secrets';
import { ENV } from '../../config/env';
import { session as dbSession } from '../db';

export default (app) => {
  app.set('port', (process.env.PORT || 3000));

  if (ENV === 'production') {
    app.use(gzip());
    app.use(helmet());
  }

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
  app.use(methodOverride());

  app.use(express.static(path.join(process.cwd(), 'public')));

  app.set('trust proxy', 'loopback');

  let sessionStore = null;
  if (!dbSession) {
    console.warn(unsupportedMessage('session'));
  } else {
    sessionStore = dbSession();
  }

  const sess = {
    resave: false,
    saveUninitialized: false,
    secret: sessionSecret,
    proxy: true,
    name: 'sessionId',
    cookie: {
      httpOnly: true,
      secure: false,
    },
    store: sessionStore
  };

  console.log('--------------------------');
  console.log('===> 😊  Starting Server . . .');
  console.log(`===>  Environment: ${ENV}`);
  console.log(`===>  Listening on port: ${app.get('port')}`);
  console.log(`===>  Using DB TYPE: postgres`);

  if (ENV === 'production') {
    console.log('===> 🚦  Note: In order for authentication to work in production');
    console.log('===>           you will need a secure HTTPS connection');
    sess.cookie.secure = true;
  }

  console.log('--------------------------');

  app.use(session(sess));
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(flash());
};
