import React, { Component } from 'react';
import Page from '../pages/Page';
import UserContainer from '../containers/User';

class User extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle = () => {
    return 'User';
  };

  pageMeta = () => {
    return [
      { name: 'description', content: 'User spage' }
    ];
  };

  pageLink = () => {
    return [];
  };

  render() {
    return (
      <Page {...this.getMetaData()}>
        <UserContainer {...this.props} />
      </Page>
    );
  }
}

export default User;
