import React, { Component } from 'react';

function PublishArticle(props) {
  return(
    <button type="button" className="list-group-item list-group-item-action" data-toggle="modal" data-target="#staticBackdrop" onClick={props.readMore}>
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
    }
  }

  render() {
    const drafts = this.props.articles.filter(article => article.status === 'DFT').map(article => <PublishArticle key={article.id} article={article} />)
    const submitted = this.props.articles.filter(article => article.status === 'SUB').map(article => <PublishArticle key={article.id} article={article} />)
    const declined = this.props.articles.filter(article => article.status === 'DEC').map(article => <PublishArticle key={article.id} article={article} />)


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
