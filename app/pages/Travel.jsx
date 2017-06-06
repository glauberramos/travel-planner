import React, { Component } from 'react';
import Page from '../pages/Page';
import TravelContainer from '../containers/Travel';

class Travel extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle = () => {
    return 'Travel | reactGo';
  };

  pageMeta = () => {
    return [
      { name: 'description', content: 'A reactGo example of a traveling page' }
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

export default Travel;
