import React from 'react';
import { Link } from "react-router-dom";
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
      <Link to={`/articles/${props.index}`} onClick={() => props.selectArticle(props.index)}>See More</Link>
    </div>  
  </div>
);

Article.propTypes = {
  article: PropTypes.object,
  selectArticle: PropTypes.func
}

Article.defaultProps = {
  article: {},
  selectArticle: () => {}
}

export default Article;