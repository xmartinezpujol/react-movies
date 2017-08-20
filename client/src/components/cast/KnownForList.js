import React from 'react';
import KnownForItem from './KnownForItem';

class KnownForList extends React.Component {
  render() {
    return(
      <div className="knownfor">
        {this.props.knownfor.map((movie) => {
          let name;
          if(movie.media_type === 'tv'){
            name = movie.name;
          }
          else{
            name = movie.title;
          }

          return (
            <KnownForItem key={movie.id}
                      type={movie.media_type}
                      id={movie.id}
                      title={name}
                      poster={movie.poster_path} />
          );
        })}
      </div>
    );
  }
}

export default KnownForList;
