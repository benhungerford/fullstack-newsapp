import React, { Component } from 'react';

class EditArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      category: '',
      status: '',
      top_story: false,
    }
    this.handleInput = this.handleInput.bind(this);
    this.toggleTopStory = this.toggleTopStory.bind(this);
  }

  handleInput(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  toggleTopStory(event) {
    this.setState({ top_story: !this.state.top_story, });
  }

  componentDidMount(){
    this.setState({...this.props.article})
  }

  render() {
    return(
      <form className="mt-3 mr-md-5 ml-md-5" onSubmit={(event) => this.props.handleEdit(event, this.state)}>
        <div className="form-group">
          <label htmlFor="title" className="font-weight-bold">Article Title</label>
          <input className="form-control mb-3" type="text" id="title" placeholder="Article Title" name="title" value={this.state.title} onChange={this.handleInput}/>
          <label htmlFor="body" className="font-weight-bold">Article Body</label>
          <textarea className="form-control mb-3" rows="10" id="body" placeholder="Article Body" name="body" value={this.state.body} onChange={this.handleInput}></textarea>
          <span className="form-group form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" onChange={this.toggleTopStory}/>
            <label className="form-check-label font-weight-bold font-italic" for="exampleCheck1">Make Top Story</label>
          </span>
          <label htmlFor="category" className="font-weight-bold">Category</label>
          <select className="form-control" id="category" name="category" value={this.state.category} onChange={this.handleInput}>
            <option>Select Category</option>
            <option value="ET">Entertainment</option>
            <option value="TR">Travel</option>
            <option value="FD">Food</option>
          </select>
          <label htmlFor="status" className="font-weight-bold">Status</label>
          {localStorage.is_staff === 'true' ?
            <React.Fragment>
              <select className="form-control" id="status" name="status" value={this.state.status} onChange={this.handleInput}>
                <option>Select Status</option>
                <option value="DFT">Draft</option>
                <option value="SUB">Submit</option>
                <option value="PUB">Publish</option>
                <option value="DEC">Decline</option>
              </select>
            </React.Fragment>
          : <React.Fragment>
              <select className="form-control" id="status" name="status" value={this.state.status} onChange={this.handleInput}>
                <option>Select Status</option>
                <option value="DFT">Draft</option>
                <option value="SUB">Submit</option>
              </select>
            </React.Fragment>}

        </div>
        <button type="submit" class="btn btn-primary mt-3">Save</button>
      </form>
    )
  }
}

export default EditArticle;
