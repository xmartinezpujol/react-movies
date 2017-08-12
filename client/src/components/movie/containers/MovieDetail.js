import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import * as movieActions from '../../../actions/movieActions';
import * as castActions from '../../../actions/castActions';
import Loader from '../../Loader';
import ActorCard from '../../presentationals/ActorCard';
import { StickyContainer, Sticky } from 'react-sticky';

class MovieDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount(){
    //Render Detail View
    this.props.dispatch(movieActions.fetchMovie(this.props.match.params.id));
    this.props.dispatch(castActions.fetchCast(this.props.match.params.id));
  }

  render() {
    const id = this.props.match.params.id;
    const movie = this.props.movie.movie;
    const cast = this.props.cast.cast;
    return(
      <div>
        {movie.length !== 0 && cast.length !== 0 &&
          <div className='movie-detail' style={{animation : "fadeIn 2s"}}>
            <div className='backdrop'
                 style={{
                   backgroundImage: `url(https://image.tmdb.org/t/p/w1400_and_h450_bestv2${movie.backdrop_path})`
                 }}>
            </div>
            <nav className='movie-menu'>
              <ul>
                <a href="#"><li>Discussions</li></a>
                <a href="#"><li>Reviews</li></a>
                <a href="#"><li>Videos</li></a>
                <a href="#"><li>Images</li></a>
                <a href="#"><li>Share</li></a>
              </ul>
            </nav>
            <StickyContainer >
              <Sticky topOffset={-300} disableCompensation>
                {
                  ({
                    style = {backgroundColor: 'red'}
                  }) => {
                    return (
                      <div className='cover' style={style} >
                        <img className='' src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2${movie.poster_path}`} />
                        <nav>
                          <ul>
                            <a className='black' href='#'><li>Option1</li></a>
                            <a className='black' href='#'><li>Option2</li></a>
                            <a className='black' href='#'><li>Option3</li></a>
                            <a className='black' href='#'><li>Option4</li></a>
                          </ul>
                        </nav>
                      </div>
                    )
                  }
                }
              </Sticky>
              <div className='movie-info-wrapper container-mid'>
                <nav className='movie-nav'></nav>
                <div className='movie-info'>
                  <h1>{movie.title}</h1>
                  <span>{String(movie.release_date).split("-", 1)}</span>
                  <div className='movie-genres'>
                    {movie.genres.map((genre) => {
                      return (
                        <Link key={genre.name} to={`/${genre.name}`}>{genre.name}</Link>
                      );
                    })}
                  </div>
                  <p>{movie.overview}</p>
                  <h2>Top Cast</h2>
                  <section className="cast">
                    {cast.slice(0, 8).map((actor) => {
                      return (
                        <Link key={actor.name} to={`/${actor.name}`}>
                          <ActorCard key={actor.name} name={actor.name} character={actor.character} portrait={actor.profile_path} />
                        </Link>
                      );
                    })}
                    <Link to={`/${id}/cast`} className='btn'>View Full Cast & Crew</Link>
                  </section>
                </div>
              </div>
            </StickyContainer>
          </div>
        }
        {this.props.movie.isFetching &&
          <Loader />
        }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {return {
  movie: state.movie,
  loading: state.loading,
  cast: state.cast
}};

export default withRouter(connect(mapStateToProps)(MovieDetail));
