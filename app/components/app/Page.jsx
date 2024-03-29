/* eslint react/forbid-prop-types: 0*/
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

const Page = ({ title, link, meta, children }) => {
  return (
    <div>
      <Helmet title={title} link={link} meta={meta} />
      { children }
    </div>
  );
};

Page.defaultProps = {
  title: '',
  link: [],
  meta: []
};

Page.propTypes = {
  title: PropTypes.string,
  link: PropTypes.array,
  meta: PropTypes.array
};

export default Page;
