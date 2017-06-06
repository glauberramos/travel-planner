import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TravelBoard from '../components/TravelBoard';

class Travel extends Component {
  render() {
    const { travels } = this.props;
    return (
      <div>
        <TravelBoard travels={ travels } />
      </div>
    );
  }
}

Travel.propTypes = {
  travels: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    travels: state.travel
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, { })(Travel);
