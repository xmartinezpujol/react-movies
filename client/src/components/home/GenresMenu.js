import React from 'react';
import { Link } from 'react-router-dom';

class GenresMenu extends React.Component {

  render(){
    return(
      <div>
          {typeof(this.props.genres) !== 'undefined' &&
          <div className="menu-genres container" style={{animation : "fadeIn 2s"}}>
            <h2>Genres</h2>
            <ul>
              {this.props.genres.map((genre, index) => {
                 return(
                   <Link to={`/movies/${genre.name.replace(/\s+/g, '-').toLowerCase()}/1`} key={index}><li key={index}>{genre.name}</li></Link>
                 );
              })}
            </ul>
          </div>
        }
      </div>
    );
  }
}

export default GenresMenu;
