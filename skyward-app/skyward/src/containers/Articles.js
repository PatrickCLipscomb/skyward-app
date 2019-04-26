import React from 'react';
import PropTypes from 'prop-types';
import Article from '../components/Article';

const Articles = (props) => (
  <div className="Articles">
    {
      props.articles.map((article, index) => <Article article={article} key={article.id} />)
    }
  </div>
);

Articles.propTypes = {
  articles: PropTypes.array
}

Articles.defaultProps = {
  articles: []
}

export default Articles;