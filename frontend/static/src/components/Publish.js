import React, { Component } from 'react';

function PublishArticle(props) {
  return(
    <button type="button" className="list-group-item list-group-item-action" onClick={() => props.editArticle(props.article)}>
      <h5 className="card-title font-weight-bold">{props.article.title}</h5>
      <div id="topstory" className="card-body">
        <p>{props.article.body}</p>
      </div>
    </button>
  )
}

class Publish extends Component {
  constructor(props) {
    super(props);

    this.state = {
      button: 'default',
      articles: [],
    }
  }

  componentDidMount() {
    if(localStorage.is_staff === 'true') {
      fetch('api/v1/articles/superuser-view/')
        .then(response => response.json())
        .then(data => this.setState({ articles: data }))
        .catch(error => console.log('Error:', error));
    }else {
      fetch('api/v1/articles/user-view/')
        .then(response => response.json())
        .then(data => this.setState({ articles: data }))
        .catch(error => console.log('Error:', error));
    }
  }

  render() {
    const drafts = this.state.articles.filter(article => article.status === 'DFT').map(article => <PublishArticle key={article.id} article={article} editArticle={this.props.editArticle} handleEdit={this.props.handleEdit} />)
    const submitted = this.state.articles.filter(article => article.status === 'SUB').map(article => <PublishArticle key={article.id} article={article} editArticle={this.props.editArticle} handleEdit={this.props.handleEdit} />)
    const declined = this.state.articles.filter(article => article.status === 'DEC').map(article => <PublishArticle key={article.id} article={article} editArticle={this.props.editArticle} handleEdit={this.props.handleEdit} />)


    return(
      <div className="row mt-3 mr-5 ml-5 no-gutters d-flex justify-content-around">
        <div className="col-3">
          <h3 className="card-header">Drafts</h3>
          <div className="list-group">
          {drafts}
          </div>
        </div>
        <div className="col-3">
          <h3 className="card-header">Submitted</h3>
          <div className="list-group">
          {submitted}
          </div>
        </div>
        <div className="col-3">
          <h3 className="card-header">Declined</h3>
          <div className="list-group">
          {declined}
          </div>
        </div>
      </div>
    );
  }
}



export default Publish;
