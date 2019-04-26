import React from 'react';
import PropTypes from 'prop-types';

const Header = (props) => (
  <div className="header">
    <h1>Hacker News API Interface for {props.date}</h1>
  </div>
);

Header.propTypes = {
  date: PropTypes.string
}

Header.defaultProps = {
  date: ''
}

export default Header;