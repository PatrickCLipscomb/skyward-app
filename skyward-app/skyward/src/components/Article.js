import React from 'react';
import PropTypes from 'prop-types';

const Article = (props) => (
  <div className="article">
    {props.article.title}
  </div>
);

Article.propTypes = {
  article: PropTypes.object
}

Article.defaultProps = {
  article: {}
}

export default Article;