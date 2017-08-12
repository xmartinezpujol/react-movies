import React from 'react';

const ActorCard = (props) => {
  return(
    <div className='actor-card'>
      <div className="actor-portrait">
        <img src={`https://image.tmdb.org/t/p/w138_and_h175_bestv2/${props.portrait}`} />
      </div>
      <strong>{props.name}</strong>
      <p>{props.character}</p>
    </div>
  );
}

export default ActorCard;
