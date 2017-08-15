import React from 'react';
import CastItem from './CastItem';

class CastList extends React.Component {
  render() {
    return(
      <div className="cast">
        {this.props.cast.slice(0, 8).map((actor) => {
          return (
            <CastItem key={actor.name}
                      name={actor.name}
                      character={actor.character}
                      portrait={actor.profile_path} />
          );
        })}
      </div>
    );
  }
}

export default CastList;
