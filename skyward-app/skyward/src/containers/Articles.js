import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Article from '../components/Article';
import Loader from '../components/Loader'

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
      <div className="">
        {
          
            this.props.loading ?
              <Loader /> :
        
          <>
            <div className="sort">
              <span>Sort By: </span>
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
                  .map((article, index) => <Article article={article} key={index} index={index} selectArticle={this.props.selectArticle} />)
              }
            </div>
            <div className="pagination">
              <button onClick={() => this.props.paginate('prev')} disabled={this.props.pagination === 1 || this.props.loading}>{'<'}</button>
              <button onClick={() => this.props.paginate('next')} disabled={this.props.pagination === 20 || this.props.loading}>{'>'}</button>
            </div>
          </>
      }
      </div>
    )
  }
}

Articles.propTypes = {
  articles: PropTypes.array,
  selectArticle: PropTypes.func,
  
}

Articles.defaultProps = {
  articles: [],
  selectArticle: () => {},
  paginate: () => {}
}

export default Articles;