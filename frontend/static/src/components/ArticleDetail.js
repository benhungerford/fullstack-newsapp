import React from 'react';


function ArticleDetail(props) {
  return(
    <div className="row row mt-3 mr-5 ml-5 no-gutters d-flex justify-content-around">
      <div className="card col-8">
        <div className="card-body">
          <h5 className="card-title font-weight-bold">{props.article.title}</h5>
          <p className="card-text">{props.article.body}</p>
          <button className="btn btn-primary">Like</button>
        </div>
      </div>
    </div>
  )
}


export default ArticleDetail;
