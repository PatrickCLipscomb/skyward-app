import React, { Component } from 'react';
import logo from './logo.svg';
import Articles from './containers/Articles';
import Footer from './components/Footer';
import Header from './components/Header';
import Loader from './components/Loader';
import About from './components/About';
import ArticleDetails from './components/ArticleDetails';
import Api from './services/HackerNewsService.js';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { withRouter } from 'react-router'
import './App.scss';

class App extends Component {
  state = {
    loading: false,
    articles: [],
    pagination: 1,
    articleIds: [],
    sortMethod: 'time',
    selectedArticle: null
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
    this.setState({pagination: pageNumber});
    // this.setState({pagination: pageNumber}, async () => {
    //   if (this.shouldLoadMore(direction)) {
    //     let articles = await this.loadNewArticles();
    //     // articles.sort((a, b) => {
    //     //     return a[this.state.sortMethod] > b[this.state.sortMethod] ? 1 : -1; 
    //     // })
    //     this.setState({articles: [...this.state.articles, ...articles]}, () => {
    //       this.sortArticles(this.state.sortMethod)
    //     });
    //   }
    // })
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
    this.setState({articles: stateCopy, sortMethod: method})
  }
  
  selectArticle = (index) => {
    this.setState({selectedArticle: index})
  }
  
  render() {
    const { articles, loading } = this.state;
    return (
      <Router>
        <div className="app">
          <Header date={'4/30/2019'} />
          <div className="wrapper">
            <Route 
              exact path="/"
              render={(props, state) => <Articles articles={articles} pagination={this.state.pagination} sortMethod={this.state.sortMethod} sortArticles={this.sortArticles} selectArticle={this.selectArticle} paginate={this.paginate} loading={loading} /> }
            />
            <Route
              path="/articles/:index"
              render={(props, state) => <ArticleDetails article={articles[this.state.selectedArticle]} />}
            />
            <Route path="/about" component={About} />
          </div>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App;
