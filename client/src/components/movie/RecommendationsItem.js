import React from 'react';

const RecommendationsItem = (props) => {
  return(
    <div className="recommendation-item">
      {props.image &&
        <img src={`https://image.tmdb.org/t/p/w250_and_h141_bestv2/${props.image}`} />
      }
      {!props.image &&
        <div className="recommendation-noimg"></div>
      }
      <div className="recommendation-info">
        <p>{props.title}</p>
        <span>{props.rating}★</span>
      </div>
    </div>
  );
}

export default RecommendationsItem;
