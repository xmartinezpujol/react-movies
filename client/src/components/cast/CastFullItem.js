import React from 'react';
import { Link } from 'react-router-dom';

const CastFullItem = (props) => {
  return(
    <div className="castfull-item">
      {props.data.profile_path &&
        <Link to={`/person/${props.data.id}`}>
          <img src={`https://image.tmdb.org/t/p/w66_and_h66_bestv2/${props.data.profile_path}`} />
        </Link>
      }
      {!props.data.profile_path &&
        <div className='no-portrait'>
          <i className="material-icons">person</i>
        </div>
      }
      <div className="castfull-item-info">
        <strong>{props.data.name}</strong>
        <p>{props.data.character}</p>
        <p>{props.data.job}</p>
      </div>
    </div>
  );
}

export default CastFullItem;
