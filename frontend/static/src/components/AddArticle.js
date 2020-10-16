import React, { Component } from 'react';

class AddArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      author: '',
      category: '',
      status: '',
      top_story: false,
    }
  }

  render() {
    return(
      <form>
        <div className="form-group">
          <label htmlFor="title" className="font-weight-bold">Article Title</label>
          <input className="form-control mb-3" type="text" id="title" placeholder="Article Title" />
          <label htmlFor="body" className="font-weight-bold">Article Body</label>
          <textarea className="form-control mb-3" rows="5" id="body" placeholder="Article Body"></textarea>
          <span className="mb-3">
            <label htmlFor="author" className="font-weight-bold">Author Name</label>
            <input className="form-control" type="text" id="author" placeholder="Author Name" />
          </span>
          <span className="form-group form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label font-weight-bold font-italic" for="exampleCheck1">Make Top Story</label>
          </span>
          <div className="form-group">
          <label htmlFor="category" className="font-weight-bold">Category</label>
          <select className="form-control" id="category">
            <option></option>
            <option>Entertainment</option>
            <option>Travel</option>
            <option>Food</option>
          </select>
          <label htmlFor="status" className="font-weight-bold">Status</label>
          <select className="form-control" id="status">
            <option></option>
            <option>Draft</option>
            <option>Submitted</option>
            <option>Published</option>
          </select>
        </div>
        </div>
      </form>
    )
  }
}

export default AddArticle;
