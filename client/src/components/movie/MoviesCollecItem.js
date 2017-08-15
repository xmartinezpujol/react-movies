import React from 'react';

const MoviesCollecItem = (props) => {
  return(
    <div>
      {props.data.backdrop_path &&
        <div className="collect-img-wrapper">
          <img src={`https://image.tmdb.org/t/p/w500_and_h281_bestv2${props.data.backdrop_path}`} />
        </div>
      }
      {!props.data.backdrop_path &&
        <div className="movie-collection-item-noimg"></div>
      }
      <div className="collection-item-info">
        <p className="collection-item-title">{props.data.title} ({String(props.data.release_date).split("-", 1)})</p>
        <span>{props.data.vote_average}★</span>
      </div>
    </div>

  );
}

export default MoviesCollecItem;
