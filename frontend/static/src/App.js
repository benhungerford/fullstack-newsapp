import React, { Component } from 'react';
import './App.css';
import Cookies from 'js-cookie';
import ArticleList from './components/ArticleList';
import EntertainmentList from './components/EntertainmentList';
import TravelList from './components/TravelList';
import FoodList from './components/FoodList';
import AddArticle from './components/AddArticle';
import Publish from './components/Publish';
import Register from './components/Register';
import EditArticle from './components/EditArticle';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      articles: [],
      button: 'home',
    }
    this.renderHome = this.renderHome.bind(this);
    this.renderEntertainment = this.renderEntertainment.bind(this);
    this.renderTravel = this.renderTravel.bind(this);
    this.renderFood = this.renderFood.bind(this);
    this.renderAddArticle = this.renderAddArticle.bind(this);
    this.renderPublish = this.renderPublish.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.readMore = this.readMore.bind(this);
    this.renderRegister = this.renderRegister.bind(this);
  }

  componentDidMount() {
    fetch('api/v1/articles/')
      .then(response => response.json())
      .then(data => this.setState({ articles: data }))
      .catch(error => console.log('Error:', error));
  }

  handleSubmit(event, data) {
    event.preventDefault();
    const csrftoken = Cookies.get('csfrtoken');
    fetch('/api/v1/', {
      method: 'POST',
      headers: {
        'X-CSRFToken': csrftoken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      const articles = [...this.state.articles, data]
      this.setState({ articles })
    })
    .catch(error => console.log('Error:', error));
  }

  async handleRegistration(event, obj) {
    event.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
      body: JSON.stringify(obj),
    };

    const handleError = (err) => console.warn(err);
    const response = await fetch('/api/v1/rest-auth/registration/', options);
    const data = await response.json().catch(handleError);

    if(data.key) {

      Cookies.set('Authorization', `Token ${data.key}`);
    }
  }

  renderHome() {
    this.setState({ button: 'home' });
  }
  renderEntertainment() {
    this.setState({ button: 'entertainment' })
  }
  renderTravel() {
    this.setState({ button: 'travel' })
  }
  renderFood() {
    this.setState({ button: 'food' })
  }
  renderAddArticle() {
    this.setState({ button: 'addArticle' });
  }
  renderPublish() {
    this.setState({ button: 'publish' });
  }
  renderRegister() {
    this.setState({ button: 'register' });
  }
  readMore() {
    this.setState({ button: 'readMore' });
  }

  render() {
    const button = this.state.button;
    let page;

    if (button === 'home') {
      page = <ArticleList readMore={this.readMore} articles={this.state.articles.filter(article => article.status === 'Published')} />
    } else if (button === 'entertainment') {
      page = <EntertainmentList articles={this.state.articles.filter(article => article.category === 'Entertainment')} />
    } else if (button === 'travel') {
      page = <TravelList articles={this.state.articles.filter(article => article.category === 'Travel')} />
    } else if (button === 'food') {
      page = <FoodList articles={this.state.articles.filter(article => article.category === 'Food')} />
    } else if (button === 'addArticle') {
      page = <AddArticle handleSubmit={this.handleSubmit} />
    } else if (button === 'publish') {
      page = <Publish articles={this.state.articles.filter(article => article.status !== 'Published')} />
    } else if (button === 'register') {
      page = <Register handleRegistration={this.handleRegistration} loginPage={this.loginPage} />
    }

    return (
      <div className="container-fluid">
        <nav className="navbar navbar-light bg-light">
          <button className="navbar-brand btn btn-light" onClick={this.renderHome}>
            <i className="fas fa-newspaper"></i>
          </button>
          <button type="button" className="btn btn-light" onClick={this.renderEntertainment}>Entertainment</button>
          <button type="button" className="btn btn-light ml-2" onClick={this.renderTravel}>Travel</button>
          <button type="button" className="btn btn-light ml-2" onClick={this.renderFood}>Food</button>
          <div className="categories">
            <button type="button" className="btn btn-info ml-2" onClick={this.renderAddArticle}>Add Article</button>
            <button type="button" className="btn btn-info ml-2" onClick={this.renderPublish}>Publish</button>
            <button type="button" className="btn btn-info ml-2" onClick={this.renderRegister}>Register</button>
          </div>
        </nav>
        {page}
      </div>
    );
  }
}

export default App;
