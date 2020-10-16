import React, { Component } from 'react';
import './App.css';
import ArticleList from './components/ArticleList';
import AddArticle from './components/AddArticle';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      articles: [],
    }
  }

  componentDidMount() {
    fetch('api/v1/')
      .then(response => response.json())
      .then(data => this.setState({ articles: data }))
      .catch(error => console.log('Error:', error));
  }

  render() {
    return (
      <div className="container">
        <nav className="navbar navbar-light bg-light">
          <button className="navbar-brand btn btn-light">
            <i className="fas fa-newspaper"></i>
          </button>
          <div className="categories">
            <button type="button" className="btn btn-light">Entertainment</button>
            <button type="button" className="btn btn-light ml-2">Travel</button>
            <button type="button" className="btn btn-light ml-2">Food</button>
            <button type="button" className="btn btn-info ml-2">Add Article</button>
          </div>
        </nav>
        <ArticleList articles={this.state.articles}/>
        <AddArticle />
      </div>
    );
  }
}

export default App;
