import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import * as personActions from '../../actions/personActions';
import * as socialActions from '../../actions/socialActions';
import * as creditsActions from '../../actions/creditsActions';
import { StickyContainer, Sticky } from 'react-sticky';
import ReactTooltip from 'react-tooltip';
import KnownForList from './KnownForList';

class PersonPage extends React.Component {
  constructor(props) {
    super(props);

    this.scrollToSection = this.scrollToSection.bind(this);
    this.orderCreditsByPop = this.orderCreditsByPop.bind(this);
    this.orderCreditsByYear = this.orderCreditsByYear.bind(this);
    this.orderCrewByYear = this.orderCrewByYear.bind(this);
    this.getRandomBackdrop = this.getRandomBackdrop.bind(this);
  }

  scrollToSection(id) {
    const section = document.getElementById(id);
    section.scrollIntoView({behaviour: 'smooth'});
  }

  orderCreditsByPop(credits) {
    let cast = credits.cast;
    let crew = credits.crew;

    //First 8 Popular Movies/Series as Actor
    let castpop = cast.sort((a, b) => {
      return  b.vote_count - a.vote_count;
    }).slice(0, 8);

    //First 8 Popular Movies/Series as Crew
    let crewpop = crew.sort((a, b) => {
      return  b.vote_count - a.vote_count;
    }).slice(0, 8);

    //Combined Movies/TV by pop
    let poplist = castpop.concat(crewpop);
    let popresult = poplist.filter((pops, index) => {
      return poplist.indexOf(pops) === index;
    }).slice(0, 8);

    return popresult;
  }

  orderCreditsByYear(credits) {
    let cast = credits.cast;
    //Sort
    let arepl, brepl;
    let castyear = cast.sort((a, b) => {

      if(a.media_type === 'tv'){
        if(typeof(a.first_air_date) === 'undefined'){
          arepl = '0';
        }
        else{
          arepl = a.first_air_date.replace(/-/g, '');
        }
      }
      else{
        if(typeof(a.release_date) === 'undefined'){
          arepl = '0';
        }
        else{
          arepl = a.release_date.replace(/-/g, '');
        }
      }
      if(b.media_type === 'tv'){
        if(typeof(b.first_air_date) === 'undefined'){
          brepl = '0';
        }
        else{
          brepl = b.first_air_date.replace(/-/g, '');
        }
      }
      else{
        if(typeof(b.release_date) === 'undefined'){
          brepl = '0';
        }
        else{
          brepl = b.release_date.replace(/-/g, '');
        }
      }
      return  brepl - arepl;
    });

    return castyear;
  }

  orderCrewByYear(crew) {
    //Sort
    let arepl, brepl;
    let crewyear = crew.sort((a, b) => {
      if(a.media_type === 'tv'){
        arepl = a.first_air_date.replace(/-/g, '');
      }
      else{
        arepl = a.release_date.replace(/-/g, '');
      }
      if(b.media_type === 'tv'){
        brepl = b.first_air_date.replace(/-/g, '');
      }
      else{
        brepl = b.release_date.replace(/-/g, '');
      }
      return  brepl - arepl;
    });
    return crewyear;
  }

  getRandomBackdrop(popmovietv) {
    //Get only the ones with backdrop
    let poplist = popmovietv.map((el) => {
      return el.backdrop_path;
    }).filter((pop) => {
      return pop !== null;
    });

    return poplist[Math.floor((Math.random() * 8))];
  }

  componentWillMount() {
    this.props.dispatch(personActions.fetchPerson(this.props.match.params.id));
    this.props.dispatch(socialActions.fetchSocial(this.props.match.params.id));
    this.props.dispatch(creditsActions.fetchCredits(this.props.match.params.id));
  }

  componentWillReceiveProps(newProps){
    if(newProps.location.pathname !== this.props.location.pathname){
      this.props.dispatch(personActions.fetchPerson(newProps.match.params.id));
      this.props.dispatch(socialActions.fetchSocial(newProps.match.params.id));
      this.props.dispatch(creditsActions.fetchCredits(newProps.match.params.id));
    }
  }

  render() {
    const person = this.props.person.person;
    const social = this.props.social.social;
    const credits = this.props.credits.credits;

    return(
      <div>
        {this.props.person.type === 'FETCH_PERSON_SUCCESS' && person.name !== null &&
          <div className="person-page" style={{animation : "fadeIn 2s"}}>
            {credits.length !== 0 &&
              <div className='backdrop'
                   style={this.getRandomBackdrop(this.orderCreditsByPop(credits)) ?
                   {backgroundImage: `url(https://image.tmdb.org/t/p/w1400_and_h450_bestv2${this.getRandomBackdrop(this.orderCreditsByPop(credits))})`}
                   : {backgroundColor: 'black'}
                   }>
              </div>
            }
            <nav className='person-menu'>
              <ul>
                <a onClick={() => this.scrollToSection('knownfor')}><li>Known for</li></a>
                <a onClick={() => this.scrollToSection('credits')}><li>Credits</li></a>
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
                        <img className='' src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2${person.profile_path}`} />
                        <nav>
                          <ul>
                            <a data-effect='solid' data-tip="Share" data-place="right" className='black' ><li><i className="material-icons">share</i></li></a>
                            {social.instagram_id !== null &&
                              <a data-effect='solid' data-tip="Instagram" data-place="right" className='black' target="_blank" href={`https://www.instagram.com/${social.instagram_id}/`} ><li><i className="fa fa-instagram" aria-hidden="true"></i></li></a>
                            }
                            {social.twitter_id !== null &&
                              <a data-effect='solid' data-tip="Twitter" data-place="right" className='black' target="_blank" href={`https://www.twitter.com/${social.twitter_id}/`} ><li><i className="fa fa-twitter" aria-hidden="true"></i></li></a>
                            }
                            {social.facebook_id !== null &&
                              <a data-effect='solid' data-tip="Facebook" data-place="right" className='black' target="_blank" href={`https://www.facebook.com/${social.facebook_id}/`} ><li><i className="fa fa-facebook" aria-hidden="true"></i></li></a>
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
                <div className='person-info container-mid'>
                  <h1>{person.name}</h1>
                  {person.biography.length !== 0 &&
                    <div className="bio">
                      <h2>Biography</h2>
                      <p>{person.biography}</p>
                    </div>
                  }
                  {credits.length !== 0 &&
                    <section id="knownfor">
                      <h2>Known for</h2>
                      <KnownForList knownfor={this.orderCreditsByPop(credits)} />
                    </section>
                  }
                  {credits.length !== 0 &&
                    <section id="credits">
                      <div className="credits-wrapper">
                        <h2>Credits</h2>
                        {credits.cast.length !== 0 &&
                          <h3>Acting</h3>
                        }
                        {this.orderCreditsByYear(credits).map((movie, index) => {
                          let name, date, link;
                          if(movie.media_type === 'tv'){
                            name = movie.name;
                            date = movie.first_air_date;
                            link = 'tv';
                            if(date === "" || typeof(date) === 'undefined') date = 'Unknown';
                          }
                          else{
                            name = movie.title;
                            date = movie.release_date;
                            link = 'movie';
                            if(date === "" || typeof(date) === 'undefined') date = 'Unknown';
                          }
                          return(
                            <div className="credit-item" key={index}>
                              <strong>{date.split("-")[0]}</strong>
                              <Link to={`/${link}/${movie.id}`}>{name}</Link>
                              {movie.character !== "" &&
                              <div className="character">
                                as
                                <span>{movie.character}</span>
                              </div>
                              }
                            </div>
                          );
                        })}
                        {credits.crew.length !== 0 &&
                          <h3>Crew</h3>
                        }
                        {this.orderCrewByYear(credits.crew).map((movie, index) => {
                          let name, date, link;
                          if(movie.media_type === 'tv'){
                            name = movie.name;
                            date = movie.first_air_date;
                            link = 'tv';

                            if(date === "") date = 'Unknown';
                          }
                          else{
                            name = movie.title;
                            date = movie.release_date;
                            link = 'movie';

                            if(date === "") date = 'Unknown';
                          }
                          return(
                            <div className="credit-item" key={index}>
                              <strong>{date.split("-")[0]}</strong>
                              <Link to={`/${link}/${movie.id}`}>{name}</Link>
                              as <span>{movie.job}</span>
                            </div>
                          );
                        })}
                      </div>
                    </section>
                  }
                </div>
              </div>
            </StickyContainer>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return{
    person: state.person,
    social: state.social,
    credits: state.credits
  }
};

export default withRouter(connect(mapStateToProps)(PersonPage));
