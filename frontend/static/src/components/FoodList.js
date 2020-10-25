import React from 'react';

function LastWeek(props) {
  return(
    <button type="button" className="list-group-item list-group-item-action font-weight-bold" onClick={() => props.readMore(props.article)}>{props.article.title}</button>
  )
}

function TopStories(props) {
  return(
    <button type="button" className="list-group-item list-group-item-action" onClick={() => props.readMore(props.article)}>
      <div>
        <img className="article-image" src={props.article.image} alt="Article" />
      </div>
      <h4 className="card-title font-weight-bold article-title">{props.article.title}</h4>
      <div id="topstory" className="card-body">
        <p>{props.article.body}</p>
      </div>
    </button>
  )
}

function FoodList(props) {
  const topStories = props.articles.filter(article => article.top_story).map(article => <TopStories key={article.id} article={article} readMore={props.readMore} />);
  const lastWeek = props.articles.filter(article => !article.top_story).map(article => <LastWeek key={article.id} article={article} readMore={props.readMore} />);
  return(
    <div className="row mt-3 mr-5 ml-5 no-gutters d-flex justify-content-around">
      <div className="col-7">
        <h3 className="card-header">Top Stories</h3>
        <div className="list-group">
        {topStories}
        </div>
      </div>
      <div className="col-3">
        <h3 className="card-header">This Week</h3>
        {lastWeek}
      </div>
    </div>
  );
}


export default FoodList;
