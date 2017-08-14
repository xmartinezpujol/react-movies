import React from 'react';

class GenreCollection extends React.Component {

  render() {
    return(
      <h1 style={{padding: '200px'}}>{`This is a ${this.props.match.params.name.toUpperCase()} Collection!`}</h1>
    );
  }
}

export default GenreCollection;
