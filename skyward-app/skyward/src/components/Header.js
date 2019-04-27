import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const Header = (props) => (
  <div className="header">
    <h1>Hacker News API Interface for {props.date}</h1>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
    </ul>
  </div>
);

Header.propTypes = {
  date: PropTypes.string
}

Header.defaultProps = {
  date: ''
}

export default Header;