import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import * as castActions from '../../actions/castActions';
import * as movieActions from '../../actions/movieActions';
import CastFullList from './CastFullList';

class CastPage extends React.Component{
  constructor(props){
    super(props);

    this.getDepartments = this.getDepartments.bind(this);
  }

  getDepartments(crew) {
    let deps = crew.map((person) => {
      return person.department;
    })

    return deps.filter((dep, index, self) => {
      return index == self.indexOf(dep);
    })
  }

  componentWillMount() {
    this.props.dispatch(castActions.fetchCast(this.props.match.params.id));
    this.props.dispatch(movieActions.fetchMovie(this.props.match.params.id));
  }

  componentWillReceiveProps(newProps){
    if(newProps.location.pathname !== this.props.location.pathname){
      this.props.dispatch(castActions.fetchCast(newProps.match.params.id));
      this.props.dispatch(movieActions.fetchMovie(newProps.match.params.id));
    }
  }

  render() {
    const cast = this.props.cast.cast.cast;
    const crew = this.props.cast.cast.crew;
    const movie = this.props.movie.movie;
    return(
      <div className="cast-page" style={{animation : "fadeIn 2s"}}>
        <div className='cast-header'
             style={
               movie.backdrop_path ?
               {backgroundImage: `url(https://image.tmdb.org/t/p/w1400_and_h450_bestv2${movie.backdrop_path})`}
               : {backgroundColor: 'black'}
             }>
          <div className="container-mid">
            <h1>{movie.title}</h1>
            <Link to={`/movie/${movie.id}`} className="btn">← Back to Movie Page</Link>
          </div>
        </div>
        <div className="container-mid">
          {this.props.cast.type === 'FETCH_CAST_SUCCESS' && cast.length > 0 &&
            <section id="cast">
              <h2>Cast</h2>
              <CastFullList cast={cast} />
            </section>
          }
          {this.props.cast.type === 'FETCH_CAST_SUCCESS' && crew.length > 0 &&
            <section id="crew">
              <h2>Crew</h2>
              {this.getDepartments(crew).map((dep, index) => {
                return(
                  <div key={index}>
                    <h3>{dep}</h3>
                    <CastFullList crew={crew} department={dep} />
                  </div>
                );
              })}
            </section>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    cast: state.cast,
    movie: state.movie
  }
};

export default withRouter(connect(mapStateToProps)(CastPage));
