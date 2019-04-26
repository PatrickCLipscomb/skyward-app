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
    pagination: 0,
    articleIds: []
  }
  
  async componentDidMount() {
    this.setState({loading: true});
    const articleIds = await Api.fetchNewStoryIDs();
    this.setState({articleIds}, async () => {
      const articles = await this.loadNewArticles();
      this.setState({articles})
      console.log(articles)
    })  
  }
  
  paginate = async (direction) => {
    const pageNumber = direction === 'next' ? this.state.pagination + 1 : this.state.pagination - 1
    this.setState({pagination: pageNumber}, async () => {
      const articles = await this.loadNewArticles();
      this.setState({articles})
    })
  }
  
  loadNewArticles = async () => {
    this.setState({loading: true});
    const articles = await Api.fetchNewStories(this.state.articleIds, this.state.pagination)
    this.setState({loading: false});
    return articles
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
              <Articles articles={articles} />
            </>
        }
        <Footer paginate={this.paginate} pagination={this.state.pagination} />
      </div>
    )
  }
}

export default App;
