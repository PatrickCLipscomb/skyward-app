import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const Article = (props) => (
  <div className="article">
    <div className="meta-wrapper">
      <div className="meta">
        <p className="primary">{props.article.title}</p>
      </div>
      <div className="meta-info">
        <Link to={`/articles/${props.index}`} onClick={() => props.selectArticle(props.index)}>Learn More</Link>
        <div>
          <p>Author: {props.article.by}</p>
          <p>Score: {props.article.score}</p>
        </div>
      </div>
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