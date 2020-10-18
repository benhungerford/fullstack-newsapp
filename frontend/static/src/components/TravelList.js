import React from 'react';

function LastWeek(props) {
  return(
    <button type="button" className="list-group-item list-group-item-action font-weight-bold">{props.article.title}</button>
  )
}

function TopStories(props) {
  return(
      <button className="list-group-item list-group-item-action">
        <h5 className="card-title font-weight-bold">{props.article.title}</h5>
        <div id="topstory" className="card-body">
          <p >{props.article.body}</p>
        </div>
      </button>
  )
}

function TravelList(props) {
  const topStories = props.articles.filter(article => article.top_story).map(article => <TopStories key={article.id} article={article} />);
  const lastWeek = props.articles.filter(article => !article.top_story).map(article => <LastWeek key={article.id} article={article} />);
  return(
    <div className="row mt-3 mr-5 ml-5 no-gutters d-flex justify-content-around">
      <div className="col-8">
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


export default TravelList;
