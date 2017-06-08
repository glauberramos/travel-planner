import React from 'react';
import Page from '../../pages/Page';
import AppContainer from './AppContainer';
import { title, meta, link } from './assets';

const App = props => (
  <Page title={title} meta={meta} link={link}>
    <AppContainer {...props} />
  </Page>
);

export default App;
