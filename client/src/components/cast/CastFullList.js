import React from 'react';
import CastFullItem from './CastFullItem';

class CastFullList extends React.Component {
  render() {
    return(
      <div className="cast-container">
        {typeof(this.props.cast) !== 'undefined' && this.props.cast.map((person, index) => {
          return(
            <CastFullItem  key={index} data={person} />
          );
        })}
        {typeof(this.props.crew) !== 'undefined' && this.props.crew.filter((person, index) => {
          return person.department === this.props.department;
        }).map((per, index) => {
          return(
            <CastFullItem  key={index} data={per} />
          );
        })}
      </div>
    );
  }
}

export default CastFullList;
