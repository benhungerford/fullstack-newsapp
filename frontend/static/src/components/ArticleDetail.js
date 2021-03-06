import React from 'react';


function ArticleDetail(props) {
  return(
    <div className="row row mt-3 mr-md-5 ml-md-5 no-gutters d-flex justify-content-around">
      <div className="card col-md-8 col-12">
        <div className="card-body">
          <div>
            <img className="article-image" src={props.article.image} alt="Article" />
          </div>
          <h4 className="card-title font-weight-bold article-title">{props.article.title}</h4>
          <p className="card-text">{props.article.body}</p>
          <button className="btn btn-primary">Like</button>
        </div>
      </div>
    </div>
  )
}


export default ArticleDetail;
