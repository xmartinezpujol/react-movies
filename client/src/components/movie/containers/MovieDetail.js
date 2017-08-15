import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import * as movieActions from '../../../actions/movieActions';
import * as castActions from '../../../actions/castActions';
import * as recommendationsActions from '../../../actions/recommendationsActions';
import * as videosActions from '../../../actions/videosActions';
import Loader from '../../Loader';
import CastList from '../CastList';
import VideosList from '../VideosList';
import RecommendationsList from '../RecommendationsList';
import { StickyContainer, Sticky } from 'react-sticky';
import ReactTooltip from 'react-tooltip';
import ReactModal from 'react-modal';

const modalStyle = {
  overlay: {
    zIndex: 200,
    backgroundColor: 'rgba(0,0,0, 0.95)'
  },
  content : {
    display               : 'flex',
    flexFlow              : 'column wrap',
    alignItems            : 'flex-end',
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    border                : 'none',
    background            : 'none !important'
  }
};

class MovieDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.getTrailers = this.getTrailers.bind(this);
    this.scrollToSection = this.scrollToSection.bind(this);
  }

  handleOpenModal () {
    this.setState({ showModal: true });
  }

  handleCloseModal () {
    this.setState({ showModal: false });
  }

  scrollToSection(id) {
    const section = document.getElementById(id);
    section.scrollIntoView({behaviour: 'smooth'});
  }

  getTrailers(videos) {
    return videos.filter((video) => {
      return video.type === 'Trailer'
    });
  }

  componentWillMount(){
    //Render Detail View
    this.props.dispatch(movieActions.fetchMovie(this.props.match.params.id));
    this.props.dispatch(castActions.fetchCast(this.props.match.params.id));
    this.props.dispatch(videosActions.fetchVideos(this.props.match.params.id));
    this.props.dispatch(recommendationsActions.fetchRecommendations(this.props.match.params.id));
  }

  componentWillReceiveProps(newProps){
    if(newProps.location.pathname !== this.props.location.pathname){
      //Rerender Detail View
      this.props.dispatch(movieActions.fetchMovie(newProps.match.params.id));
      this.props.dispatch(castActions.fetchCast(newProps.match.params.id));
      this.props.dispatch(videosActions.fetchVideos(newProps.match.params.id));
      this.props.dispatch(recommendationsActions.fetchRecommendations(newProps.match.params.id));
    }
  }

  render() {
    const id = this.props.match.params.id;
    const movie = this.props.movie.movie;
    const cast = this.props.cast.cast;
    const videos = this.props.videos.videos;
    const recommendations = this.props.recommendations.recommendations;
    return(
      <div>
        {movie.length !== 0 && this.props.cast.type === 'FETCH_CAST_SUCCESS' && this.props.videos.type === 'FETCH_VIDEOS_SUCCESS' &&
          <div className='movie-detail' style={{animation : "fadeIn 2s"}}>
            <div className='backdrop'
                 style={
                   movie.backdrop_path ?
                   {backgroundImage: `url(https://image.tmdb.org/t/p/w1400_and_h450_bestv2${movie.backdrop_path})`}
                   : {backgroundColor: 'black'}
                 }>
            </div>
            <nav className='movie-menu'>
              <ul>
                <a onClick={() => this.scrollToSection('cast')}><li>Cast</li></a>
                {videos.length !== 0 &&
                  <a onClick={() => this.scrollToSection('videos')}><li>Videos</li></a>
                }
                {recommendations.length !== 0 &&
                  <a onClick={() => this.scrollToSection('recommendations')}><li>Recommendations</li></a>
                }
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
                            <a data-effect='solid' data-tip="Share" data-place="right" className='black' ><li><i className="material-icons">share</i></li></a>
                            <a data-effect='solid' data-tip="Follow" data-place="right" className='black' ><li><i className="material-icons">favorite</i></li></a>
                            <a data-effect='solid' data-tip="Watch" data-place="right" className='black' ><li><i className="material-icons">bookmark</i></li></a>
                            {videos.length !== 0 &&
                              <a onClick={this.handleOpenModal} data-effect='solid' data-tip="Play Trailer" data-place="right" className='black'><li><i className="material-icons">play_arrow</i></li></a>
                            }
                            <ReactTooltip />
                          </ul>
                        </nav>
                      </div>
                    )
                  }
                }
              </Sticky>
              <div className='movie-info-wrapper'>
                <div className='movie-info'>
                  <section id="generalinfo">
                    <div className="heading-info">
                      <h1>{movie.title} <span>({String(movie.release_date).split("-", 1)})</span></h1>
                      <p className="heading-votes">{movie.vote_average}★ <span>({movie.vote_count})</span></p>
                    </div>
                    <div className='movie-genres'>
                      {movie.genres.map((genre) => {
                        return (
                          <Link key={genre.name} className='btn' to={`/movies/${genre.name.replace(/\s+/g, '-').toLowerCase()}/1`}>{genre.name}</Link>
                        );
                      })}
                    </div>
                    <div className="movie-releaseinfo">
                      {movie.runtime !== 'null' &&
                        <p>{movie.runtime} min</p>
                      }
                      {movie.release_date &&
                        <p>{movie.release_date.split('-')[2]+'/'+movie.release_date.split('-')[1]+'/'+movie.release_date.split('-')[0]}</p>
                      }
                      {movie.budget !== 0 &&
                        <p>Budget: ${movie.budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                      }
                      {movie.revenue !== 0 &&
                        <p>Revenue: ${movie.revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                      }
                      {movie.homepage &&
                        <a href={movie.homepage} target="_blank">Website</a>
                      }
                    </div>
                    <p>{movie.overview}</p>
                  </section>
                  {cast.length !== 0 &&
                    <section id="cast">
                      <h2>Top Cast</h2>
                      <CastList cast={cast} />
                      <Link to={`/${id}/cast`} className='btn'>View Full Cast & Crew</Link>
                    </section>
                  }
                  {videos.length !== 0 &&
                    <section id="videos">
                      <h2>Videos</h2>
                      <VideosList videos={videos} />
                    </section>
                  }
                  {recommendations.length !== 0 &&
                    <section id="recommendations">
                      <h2>Recommendations</h2>
                      <RecommendationsList recommendations={recommendations} />
                    </section>
                  }
                </div>
              </div>
            </StickyContainer>
          </div>
        }
        {this.props.movie.isFetching &&
          <Loader />
        }
        {videos.length !== 0 && this.props.videos.type === 'FETCH_VIDEOS_SUCCESS' &&
          <ReactModal
             isOpen={this.state.showModal}
             contentLabel="Play Trailer"
             style={modalStyle}
             onRequestClose={this.handleCloseModal}
             shouldCloseOnOverlayClick={true}
          >
            <button className='close' onClick={this.handleCloseModal}>X</button>
            <iframe width="853" height="480" src={`https://www.youtube.com/embed/${this.getTrailers(videos)[0].key}?autoplay=1`} frameBorder="0" allowFullScreen></iframe>
          </ReactModal>
        }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {return {
  movie: state.movie,
  loading: state.loading,
  cast: state.cast,
  videos: state.videos,
  recommendations: state.recommendations
}};

export default withRouter(connect(mapStateToProps)(MovieDetail));
