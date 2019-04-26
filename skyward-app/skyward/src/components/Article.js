import React from 'react';
import PropTypes from 'prop-types';

const Article = (props) => (
  <div className="article">
    <div className="meta-wrapper">
      <div className="meta">
        <p className="primary">{props.article.title}</p>
      </div>
      <div className="secondary">
        <p>{props.article.score}</p>
        <p>{props.article.by}</p>
      </div>
    </div>  
  </div>
);

Article.propTypes = {
  article: PropTypes.object
}

Article.defaultProps = {
  article: {}
}

export default Article;