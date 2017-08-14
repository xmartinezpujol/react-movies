import React from 'react';
import { Link } from 'react-router-dom';

const ActorCard = (props) => {
  return(
    <div className='actor-card'>
      <div className="actor-portrait">
      {props.portrait &&
        <Link key={props.name} to={`/${props.name}`}>
          <img src={`https://image.tmdb.org/t/p/w138_and_h175_bestv2/${props.portrait}`} />
        </Link>
      }
      {!props.portrait &&
        <div className='no-portrait'>
          <i className="material-icons">person</i>
        </div>
      }
      </div>
      <strong>{props.name}</strong>
      <p>{props.character}</p>
    </div>
  );
}

export default ActorCard;
