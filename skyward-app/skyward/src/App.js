import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Articles from './containers/Articles';
import Footer from './components/Footer';
import Header from './components/Header';
import Loader from './components/Loader';

class App extends Component {
  state = {
    loading: false,
    articles: [],
  }
  
  render() {
    const { articles, loading } = this.state;
    return (
      <div className="app">
        {
          loading ?
            <Loader /> :
            <>
              <Header date={'4/25/2019'} />
              <Articles articles={articles} />
              <Footer />
            </>
        }
      </div>
    )
  }
}

export default App;
