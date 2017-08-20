import React from 'react';
import { Link } from 'react-router-dom';

const KnownForItem = (props) => {
  return(
    <div className='movie-card'>
      <div className="movie-poster">
        {props.type === 'tv' &&
          <div>
            <Link key={props.id} to={`/tv/${props.id}`}>
              {props.poster &&
                <img src={`https://image.tmdb.org/t/p/w150_and_h225_bestv2/${props.poster}`} />
              }
              {!props.poster &&
                <div className='no-portrait'>
                  <i className="material-icons">movie</i>
                </div>
              }
            </Link>
            <p>{props.title}</p>
          </div>
        }
        {props.type === 'movie' &&
          <div>
            <Link key={props.id} to={`/movie/${props.id}`}>
              {props.poster &&
                <img src={`https://image.tmdb.org/t/p/w150_and_h225_bestv2/${props.poster}`} />
              }
              {!props.poster &&
                <div className='no-portrait'>
                  <i className="material-icons">movie</i>
                </div>
              }
            </Link>
            <p>{props.title}</p>
          </div>
        }
      </div>
    </div>
  );
}

export default KnownForItem;
