import React, { Component } from 'react';
import './App.css';
import Cookies from 'js-cookie';
import ArticleList from './components/ArticleList';
import ArticleDetail from './components/ArticleDetail';
import EntertainmentList from './components/EntertainmentList';
import TravelList from './components/TravelList';
import FoodList from './components/FoodList';
import AddArticle from './components/AddArticle';
import Publish from './components/Publish';
import Register from './components/Register';
import Login from './components/Login';
import EditArticle from './components/EditArticle';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      articles: [],
      article: {},
      button: 'home',
      isLoggedIn: Cookies.get('Authorization')? true:false,
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
    this.renderLogin = this.renderLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.editArticle = this.editArticle.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentDidMount() {
    fetch('api/v1/articles/')
      .then(response => response.json())
      .then(data => this.setState({ articles: data }))
      .catch(error => console.log('Error:', error));
  }


  handleSubmit(event, data) {
    event.preventDefault();
    const csrftoken = Cookies.get('csrftoken');
    fetch('/api/v1/articles/', {
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
    this.renderPublish();
  }

  async handleEdit(event, data) {
    event.preventDefault();
    const csrftoken = Cookies.get('csrftoken');
    fetch(`/api/v1/articles/${data.id}/`, {
      method: 'PUT',
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
      this.renderPublish();
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
      localStorage.setItem('is_staff', data.is_staff)
      this.renderHome();
    }
  }

  async handleLogin(event, obj) {
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
    const response = await fetch('/api/v1/rest-auth/login/', options).catch(handleError);
    const data = await response.json().catch(handleError);
    console.log(data);
    if(data.key) {
      Cookies.set('Authorization', `Token ${data.key}`);
      this.setState({isLoggedIn: true});
      localStorage.setItem('is_staff', data.is_staff);
      this.renderHome();
    }
  }

  async handleLogout(event){
    const options = {
      method: 'POST',
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
    };
    const handleError = (err) => console.warn(err);
    const response = await fetch('/api/v1/rest-auth/logout/', options);
    const data = await response.json().catch(handleError);
    // console.log(data);
    if(data.detail === "Successfully logged out."){
      Cookies.remove('Authorization');
      this.setState({isLoggedIn: false});
      localStorage.removeItem('is_staff', data.is_staff)
      this.renderHome();
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
  renderLogin() {
    this.setState({ button: 'login' });
  }
  readMore(article) {
    this.setState({ button: 'readMore', article });
  }
  editArticle(article) {
    this.setState({ button: 'editArticle', article })
  }


  render() {
    const isLoggedIn = this.state.isLoggedIn;
    const button = this.state.button;
    let page;

    if (button === 'home') {
      page = <ArticleList readMore={this.readMore} articles={this.state.articles.filter(article => article.status === 'PUB')} />
    } else if (button === 'entertainment') {
      page = <EntertainmentList readMore={this.readMore} articles={this.state.articles.filter(article => article.category === 'ET')} />
    } else if (button === 'travel') {
      page = <TravelList readMore={this.readMore} articles={this.state.articles.filter(article => article.category === 'TR')} />
    } else if (button === 'food') {
      page = <FoodList readMore={this.readMore} articles={this.state.articles.filter(article => article.category === 'FD')} />
    } else if (button === 'addArticle') {
      page = <AddArticle handleSubmit={this.handleSubmit} />
    } else if (button === 'publish') {
      page = <Publish handleEdit={this.handleEdit} editArticle={this.editArticle} articles={this.state.articles.filter(article => article.status !== 'PUB')} />
    } else if (button === 'register') {
      page = <Register handleRegistration={this.handleRegistration} />
    } else if (button === 'login') {
      page = <Login handleLogin={this.handleLogin} />
    } else if (button === 'readMore') {
      page = <ArticleDetail article={this.state.article} />
    } else if (button === 'editArticle') {
      page = <EditArticle article={this.state.article} handleEdit={this.handleEdit}/>
    }

    return (

        <div className="container-fluid">
          <nav className="navbar navbar-light bg-light">
          {!isLoggedIn ?
            <React.Fragment>
              <div>
                <button className="navbar-brand btn btn-dark text-white" onClick={this.renderHome}>Home</button>
                <button type="button" className="btn btn-light" onClick={this.renderEntertainment}>Entertainment</button>
                <button type="button" className="btn btn-light ml-2" onClick={this.renderTravel}>Travel</button>
                <button type="button" className="btn btn-light ml-2" onClick={this.renderFood}>Food</button>
              </div>
              <div className="categories">
                <button type="button" className="btn btn-info ml-2" onClick={this.renderRegister}>Register</button>
                <button type="button" className="btn btn-info ml-2" onClick={this.renderLogin}>Login</button>
              </div>
            </React.Fragment>
          : <React.Fragment>
              <div>
                <button className="navbar-brand btn btn-dark text-white" onClick={this.renderHome}>Home</button>
                <button type="button" className="btn btn-light" onClick={this.renderEntertainment}>Entertainment</button>
                <button type="button" className="btn btn-light ml-2" onClick={this.renderTravel}>Travel</button>
                <button type="button" className="btn btn-light ml-2" onClick={this.renderFood}>Food</button>
              </div>
              <div className="categories">
                <button type="button" className="btn btn-info ml-2" onClick={this.renderAddArticle}>Add Article</button>
                <button type="button" className="btn btn-info ml-2" onClick={this.renderPublish}>Publish</button>
                <button type="button" className="btn btn-danger ml-2" onClick={this.handleLogout}>Logout</button>
              </div>
            </React.Fragment>
          }
          </nav>
          {page}
          <footer className="bg-light d-flex justify-content-md-center align-items-center mt-5"><i className="far fa-copyright mr-1"></i>Ben Hungerford</footer>
        </div>

    );
  }
}

export default App;
