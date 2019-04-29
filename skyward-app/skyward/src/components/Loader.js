import React from 'react';
import PropTypes from 'prop-types';
import rings from './rings.svg';

const Loader = (props) => (
  <div className="loader">
    <img src={rings} className="Loader-img" alt="Loading" />
    <p>Loading...</p>
  </div>
);

Loader.propTypes = {
  
}

Loader.defaultProps = {
  
}

export default Loader;