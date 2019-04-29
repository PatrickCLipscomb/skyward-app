import React from 'react';
import PropTypes from 'prop-types';

const ArticleDetails = (props) => (
  <div className="article-details">
    <p className="primary">Title: {props.article.title}</p>
    <div className="secondary">
      <p>Score: {props.article.score}</p>
      <p>Author: {props.article.by}</p>
    </div>
    <a href={props.article.url} target="_blank">View Story</a>
  </div>
);

ArticleDetails.propTypes = {
  article: PropTypes.object
}

ArticleDetails.defaultProps = {
  article: {}
}

export default ArticleDetails;