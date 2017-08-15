import React from 'react';
import MoviesCollecItem from './MoviesCollecItem';
import { Link } from 'react-router-dom';

class MoviesCollection extends React.Component{
  constructor(props) {
    super(props);
    this.state = { animate: false }

    this.animateComponent = this.animateComponent.bind(this);
  }

  animateComponent(animation, time) {
    document.getElementsByClassName('movies-collection')[0].style.animation = `${animation} ${time}`;
    setTimeout(() => {
      document.getElementsByClassName('movies-collection')[0].style.animation = '';
    }, 5000);
  }

  componentDidMount() {
    this.animateComponent('fadeIn', '4s');
  }

  componentWillReceiveProps() {
    this.animateComponent('fadeIn', '4s');
  }

  render() {
    const movies = this.props.movies;
    const genre = this.props.genre;
    const page = this.props.page;
    return(
      <div className="movies-collection">
        {movies.map((movie, index) => {
          return(
            <Link to={`/movie/${movie.id}`} key={index} className="movies-collection-item" >
              <MoviesCollecItem key={`movie-${index}`} data={movie} />
            </Link>
          );
        })}
        <div className="collection-pagination">
          {page > 1 &&
            <Link
                 to={`/movies/${genre ? genre+'/' : ''}${page - 1}`}
                 className="prev-page">
                 <i className="material-icons">keyboard_arrow_left</i>
                 {`Page ${page - 1}`}
            </Link>
          }
          {page === 1 &&
            <div className="prev-page"></div>
          }
          <Link
               to={`/movies/${genre ? genre+'/' : ''}${page + 1}`}
               className="next-page">
               <i className="material-icons">keyboard_arrow_right</i>
               {`Page ${page + 1}`}
          </Link>
        </div>
      </div>
    );
  }
}

export default MoviesCollection;
