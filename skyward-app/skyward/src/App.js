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
import { Router, Route, Link, Switch } from "react-router-dom";
import './App.scss';
import createHistory from 'history/createBrowserHistory';

export const history = createHistory();

class App extends Component {
  state = {
    loading: false,
    articles: [],
    pagination: 1,
    articleIds: [],
    sortMethod: 'by',
    selectedArticle: null
  }
  
  async componentDidMount() {
    this.setState({loading: true});
    const articleIds = await Api.fetchNewStoryIDs();
    this.setState({articleIds}, async () => {
      if (articleIds) {
        let count = 0;
        while (count < (articleIds.length - 1)) {
          const articles = await this.loadNewArticles(count);
          let articlesCopy = this.state.articles
          articlesCopy.push(...articles)
          this.setState({articles: articlesCopy}, () => {
            this.sortArticles(this.state.sortMethod)
          })
          count += 50
        }
      } else {
        this.setState({loading: false});
      }
    })  
  }
  
  paginate = async (direction) => {
    const pageNumber = direction === 'next' ? this.state.pagination + 1 : this.state.pagination - 1
    this.setState({pagination: pageNumber});
  }
  
  loadNewArticles = async (count) => {
    const articles = await Api.fetchNewStories(this.state.articleIds, count)
    this.setState({loading: false});
    return articles
  }
  
  sortArticles = (method) => {
    let stateCopy = this.state.articles
    stateCopy.sort((a, b) => {
      if (method === 'by') {
        if (!isNaN(a.by.charAt(0)) && isNaN(b.by.charAt(0))) {
          return 1
        } else if (!isNaN(b.by.charAt(0)) && isNaN(a.by.charAt(0))) {
          return -1
        } else {
          return a.by > b.by ? 1 : -1;
        }
      } else if (method === 'score') {
        return a.score > b.score ? 
          1 : 
          (a.score === b.score ?
            (a.time > b.time ?
              -1 :
              1) :
            -1)
      } else {
        return a[method] > b[method] ? 1 : -1;
      }
         
    })
    this.setState({articles: stateCopy, sortMethod: method})
  }
  
  selectArticle = (index) => {
    this.setState({selectedArticle: index})
  }
  
  render() {
    const { articles, loading } = this.state;
    return (
      <Router history={history}>
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
