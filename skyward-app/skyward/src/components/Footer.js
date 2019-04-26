import React from 'react';
import PropTypes from 'prop-types';

const Footer = (props) => (
  <div className="footer">
    <button onClick={() => props.paginate('prev')} disabled={props.pagination === 0}>Previous</button>
    <button onClick={() => props.paginate('next')}>Next</button>
  </div>
);

Footer.propTypes = {
  paginate: PropTypes.func,
  pagination: PropTypes.number
}

Footer.defaultProps = {
  paginate: () => {}
}

export default Footer;