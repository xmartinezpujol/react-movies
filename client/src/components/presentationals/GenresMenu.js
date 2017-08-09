import React from 'react';

class GenresMenu extends React.Component {

  render(){
    return(
      <div className="menu-genres container">
        <h2>Genres</h2>
        <ul>
          {typeof(this.props.genres) !== 'undefined' && this.props.genres.map((genre, index) => {
             return(
               <a key={index} href="#"><li key={index}>{genre.name}</li></a>
             );
          })}
        </ul>
      </div>
    );
  }
}

export default GenresMenu;
