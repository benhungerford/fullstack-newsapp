import React from 'react';

function Article(props) {
  return()
}


function ArticleList(props) {
  const articles = 
  return(
    <div className="row mt-3 no-gutters justify-content-space-between">
      <div className="card col-8">
        <h5 className="card-header">Top Stories</h5>
        <div className="card-body">
          <h5 className="card-title">Special title treatment</h5>
          <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
          <button className="btn btn-primary">Read More</button>
        </div>
      </div>
      <div className="card col-4">
        <h5 className="card-header">This Week</h5>
        <button type="button" className="list-group-item list-group-item-action">
          Cras justo odio
        </button>
        <button type="button" className="list-group-item list-group-item-action">Dapibus ac facilisis in</button>
        <button type="button" className="list-group-item list-group-item-action">Morbi leo risus</button>
        <button type="button" className="list-group-item list-group-item-action">Porta ac consectetur ac</button>
        <button type="button" className="list-group-item list-group-item-action">Vestibulum at eros</button>
      </div>
    </div>)
  )
}
