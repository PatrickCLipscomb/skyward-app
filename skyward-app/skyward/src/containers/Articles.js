import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Article from '../components/Article';

class Articles extends Component {
  state = {
    sortedBy: 'time',
    page: [0, 25],
    sortMethod: this.props.sortMethod
  }
  
  componentDidUpdate(prevProps) {
    if (this.props.pagination !== prevProps.pagination) {
      this.currentPage()
      return true;
    }
  }
  
  currentPage = () => {
    console.log('currentPage')
    const lower = this.props.pagination === 1 ? 0 : (this.props.pagination - 1) * 25;
    const upper = this.props.pagination * 25;
    this.setState({page: [lower, upper]})
  }
  
  handleChange = (e) => {
    this.setState({sortMethod: e.target.value})
    this.props.sortArticles(e.target.value)
  }
  
  render() {
    this.props.articles.forEach((article) => console.log(article.score))
    return (
      <>
        <div>
          <select id="lang" onChange={this.handleChange} value={this.state.sortMethod}>
              <option value="time">Time</option>
              <option value="score">Score</option>
              <option value="by">Author</option>
          </select>
        </div>
        <div className="articles">
          {
            this.props.articles
              .slice(this.state.page[0], this.state.page[1])
              .map((article, index) => <Article article={article} key={index} />)
          }
        </div>
      </>
    )
  }
}

Articles.propTypes = {
  articles: PropTypes.array
}

Articles.defaultProps = {
  articles: []
}

export default Articles;