import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Articles from './containers/Articles';
import Footer from './components/Footer';
import Header from './components/Header';
import Loader from './components/Loader';
import Api from './services/HackerNewsService.js';

class App extends Component {
  state = {
    loading: false,
    articles: [],
    pagination: 1,
    articleIds: [],
    sortMethod: 'time'
  }
  
  async componentDidMount() {
    this.setState({loading: true});
    const articleIds = await Api.fetchNewStoryIDs();
    this.setState({articleIds}, async () => {
      const articles = await this.loadNewArticles();
      this.setState({articles}, () => {
        this.sortArticles(this.state.sortMethod)
      })
      console.log(articles)
    })  
  }
  
  paginate = async (direction) => {
    const pageNumber = direction === 'next' ? this.state.pagination + 1 : this.state.pagination - 1
    this.setState({pagination: pageNumber}, async () => {
      if (this.shouldLoadMore(direction)) {
        let articles = await this.loadNewArticles();
        articles.sort((a, b) => {
            return a[this.state.sortMethod] > b[this.state.sortMethod] ? 1 : -1; 
        })
        this.setState({articles: [...this.state.articles, ...articles]});
      }
    })
  }
  
  shouldLoadMore = (direction) => {
    const pageIndex = this.state.pagination - 1
    const pageGroup = pageIndex / 4 * 100 
    console.log('what we have,', pageIndex, pageGroup, this.state.articles.length)
    if (pageIndex % 4 === 0 && direction === 'next' && this.state.articles.length <= pageGroup && this.state.articles.length < 500) {
      return true;
    } else {
      return false;
    }
  }
  
  loadNewArticles = async () => {
    this.setState({loading: true});
    const articles = await Api.fetchNewStories(this.state.articleIds, this.state.pagination)
    this.setState({loading: false});
    return articles
  }
  
  sortArticles = (method) => {
    let stateCopy = this.state.articles
    stateCopy.sort((a, b) => {
        return a[method] > b[method] ? 1 : -1; 
    })
    this.setState({articles: stateCopy, sortMethod: method, pagination: 1})
  }
  
  render() {
    const { articles, loading } = this.state;
    return (
      <div className="app">
        <Header date={'4/25/2019'} />
        {
          loading ?
            <Loader /> :
            <>
              <Articles articles={articles} pagination={this.state.pagination} sortMethod={this.state.sortMethod} sortArticles={this.sortArticles} />
            </>
        }
        <Footer paginate={this.paginate} pagination={this.state.pagination} loading={loading} />
      </div>
    )
  }
}

export default App;
