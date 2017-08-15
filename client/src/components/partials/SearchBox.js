import React from 'react';

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};

    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(e) {
    const text = e.target.value;
    this.setState(() => {
      return {text: text}
    });
  }

  render() {
    return(
      <div className='search-wrapper'>
        <input type="text"
               id="searchbox"
               value={this.state.text}
               placeholder="Search for a title..."
               onChange={(e) => this.handleInput(e)}
        />
        <p>{this.state.text}</p>
      </div>
    );
  }
}

export default SearchBox;
