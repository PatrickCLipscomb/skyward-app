import React, { Component } from 'react';
import logo from './logo.svg';
import Articles from './containers/Articles';
import Footer from './components/Footer';
import Header from './components/Header';
import Loader from './components/Loader';
import About from './components/About';
import NotFound from './components/NotFound';
import ArticleDetails from './components/ArticleDetails';
import Api from './services/HackerNewsService.js';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
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
      if (articleIds) {
        const articles = await this.loadNewArticles();
        this.setState({articles}, () => {
          this.sortArticles(this.state.sortMethod)
        })
        console.log(articles)
      } else {
        this.setState({loading: false});
      }
    })  
  }
  
  paginate = async (direction) => {
    const pageNumber = direction === 'next' ? this.state.pagination + 1 : this.state.pagination - 1
    this.setState({pagination: pageNumber});
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
            <Switch>
              <Route 
                exact path="/"
                render={(props, state) => <Articles articles={articles} pagination={this.state.pagination} sortMethod={this.state.sortMethod} sortArticles={this.sortArticles} selectArticle={this.selectArticle} paginate={this.paginate} loading={loading} /> }
              />
              <Route
                path="/articles/:index"
                render={(props, state) => <ArticleDetails article={articles[this.state.selectedArticle]} />}
              />
              <Route path="/about" component={About} />
              <Route path="*" component={NotFound} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App;
