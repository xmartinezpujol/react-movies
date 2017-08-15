import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as moviesActions from '../../actions/moviesActions';
import MoviesCollection from './MoviesCollection';

class MoviesPage extends React.Component {

  constructor(props) {
    super(props);

    this.getGenreAPIId = this.getGenreAPIId.bind(this);
  }

  getGenreAPIId(genrename) {
    genrename = genrename.split('-').map((word) => {
      return (
        word.charAt(0).toUpperCase() + word.slice(1)
      );
    });

    genrename = genrename.join(" ");

    //Exception
    if(genrename === 'Tv Movie') genrename = 'TV Movie';

    //Convert text genre to TMDB ids
    const genreAPI = this.props.genres.genres.filter((genre) => {
      return(
        genre.name === genrename
      );
    });

    console.log(genreAPI);
    return genreAPI[0].id;
  }

  componentWillMount() {
    const page = this.props.match.params.id;
    let genrename = this.props.match.params.genre;

    if(genrename){
      const genreid = this.getGenreAPIId(genrename);

      //Render Movies with Genre List View
      this.props.dispatch(moviesActions.fetchMovies('popularity.desc', page, genreid));
    }
    else{
      //Render Movies List View
      this.props.dispatch(moviesActions.fetchMovies('popularity.desc', page));
    }
  }

  componentWillReceiveProps(newProps){
    if(newProps.location.pathname !== this.props.location.pathname){
      const page = this.props.match.params.id;
      let genrename = this.props.match.params.genre;

      if(genrename){
        const genreid = this.getGenreAPIId(genrename);

        //Render Movies with Genre List View
        this.props.dispatch(moviesActions.fetchMovies('popularity.desc', newProps.location.pathname.split("/")[3], genreid));
      }
      else{
        //Render Movies List View
        this.props.dispatch(moviesActions.fetchMovies('popularity.desc', newProps.location.pathname.split("/")[2]));
      }
    }
  }

  render() {
    const movies = this.props.movies.movies;
    const genre = this.props.match.params.genre;
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
            <MoviesCollection movies={movies} page={page} genre={genre ? genre : false} />
          </section>
        }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => { return {
  movies: state.movies,
  genres: state.genres
}};

export default withRouter(connect(mapStateToProps)(MoviesPage));
