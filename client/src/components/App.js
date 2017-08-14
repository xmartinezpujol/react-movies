import React from 'react';
import {connect} from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import * as genreActions from '../actions/genreActions';
import * as userActions from '../actions/userActions';
import Header from './partials/Header';
import HomePage from './home/HomePage';
import ProfilePage from './profile/ProfilePage';
import MovieDetail from './movie/containers/MovieDetail';
import MoviesPage from './movie/MoviesPage';
import GenreCollection from './genre/GenreCollection';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    //Fetch Genres from API
    this.props.dispatch(genreActions.fetchGenres());
    //Set the current user
    this.props.dispatch(userActions.getUser());
  }

  render() {
    //Genre list ready from TMDB API
    const genresAPI = this.props.genrelist.genres;
    const sampleUser = this.props.user.sampleUser;

    return(
      <div>
        {typeof(sampleUser) !== 'undefined' && typeof(genresAPI[0]) !== 'undefined' &&
          <div>
            <Header user={sampleUser}/>
            <Switch>
              <Route exact path='/'                render={()=> <HomePage user={sampleUser} genres={genresAPI} />}/>
              <Route path='/profile'               component={ProfilePage}/>
              <Route exact path='/movies/:id'            component={MoviesPage}/>
              <Route exact path='/movie/:id'       component={MovieDetail}/>
              <Route path='/movie/genre/:name'     component={GenreCollection}/>
              <Route path='/tv/genre/:name'        component={GenreCollection}/>
            </Switch>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {return {
  genrelist: state.genres,
  user: state.user
}};

export default withRouter(connect(mapStateToProps)(App));
