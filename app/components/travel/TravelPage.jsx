import React, { Component } from 'react';
import Page from '../../pages/Page';
import TravelContainer from './TravelContainer';

class TravelPage extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle = () => {
    return 'Travel';
  };

  pageMeta = () => {
    return [
      { name: 'description', content: 'Travelling page' }
    ];
  };

  pageLink = () => {
    return [];
  };

  render() {
    return (
      <Page {...this.getMetaData()}>
        <TravelContainer {...this.props} />
      </Page>
    );
  }
}

export default TravelPage;
