import React from 'react';
import PropTypes from 'prop-types';

const ArticleDetails = (props) => (
  <div className="article-details">
    <p className="primary">{props.article.title}</p>
    <div className="secondary">
      <p>{props.article.score}</p>
      <p>{props.article.by}</p>
    </div>
  </div>
);

ArticleDetails.propTypes = {
  article: PropTypes.object
}

ArticleDetails.defaultProps = {
  article: {}
}

export default ArticleDetails;