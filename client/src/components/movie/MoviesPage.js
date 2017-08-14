import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as moviesActions from '../../actions/moviesActions';

class MoviesPage extends React.Component {

  componentWillMount() {
    const page = this.props.match.params.id;
    
    //Render Movies List View
    this.props.dispatch(moviesActions.fetchMovies('popularity.desc', page));
  }

  componentWillReceiveProps(newProps){
    const page = this.props.match.params.id;

    if(newProps.location.pathname !== this.props.location.pathname){
      //Rerender Detail View
      this.props.dispatch(moviesActions.fetchMovies('popularity.desc', page));
    }
  }

  render() {
    const movies = this.props.movies.movies;
    const page = parseInt(this.props.match.params.id);
    return(
      <div>
        <nav className="menu-filters">
          <ul>Order By:
            <li>Filter 1</li>
            <li>Filter 2</li>
            <li>Filter 3</li>
          </ul>
        </nav>
        {movies.length !== 0 && this.props.movies.type === 'FETCH_MOVIES_SUCCESS' &&
          <section id="movies-catalog">
            <div className="movies-collection">
              {movies.map((movie, index) => {
                return(
                  <div key={`movie-${index}`} className="movies-collection-item">
                    {movie.backdrop_path &&
                      <img src={`https://image.tmdb.org/t/p/w500_and_h281_bestv2${movie.backdrop_path}`} />
                    }
                    {!movie.backdrop_path &&
                      <div className="movie-collection-item-noimg"></div>
                    }
                  </div>
                );
              })}
              <div className="collection-pagination">
                <Link to={`/movies/${page - 1}`} className="prev-page">{`Page ${page - 1}`}</Link>
                <Link to={`/movies/${page + 1}`} className="next-page">{`Page ${page + 1}`}</Link>
              </div>
            </div>
          </section>
        }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => { return {
  movies: state.movies
}};

export default withRouter(connect(mapStateToProps)(MoviesPage));
