import React from 'react';
import HeroItem from '../HeroItem';

const API_KEY = '3068f3a34eb23cadda9e625ea4e903bd';
const API_LANG = 'en-US';
const MAX_SLIDES = 8;

function scrollTo(element, direction, times) {
  if(times > 0){
    setTimeout(() => {
      if(direction === 'left'){
        element.scrollLeft -= window.innerWidth;
      }
      if(direction === 'right'){
        element.scrollLeft += window.innerWidth;
      }
      scrollTo(element, direction, times - 1);
    }, 100);
  }
}

class HeroList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      currentSlideSet: 0
    };

    this.loadTopPicksAPI = this.loadTopPicksAPI.bind(this);
    this.handleSlideMove = this.handleSlideMove.bind(this);
  }

  loadTopPicksAPI() {
    let url = `https://api.themoviedb.org/3/${this.props.url}?api_key=${API_KEY}${this.props.sort}&language=${API_LANG}&page=1`;
    fetch(url)
      .then(response => response.json())
      .then(res => {
        this.setState(() => { return {data: res.results }} );
        }
      )
      .catch((res) => {
        console.log('ERROR: No image from API!');
      });
  }

  componentWillMount() {
    this.loadTopPicksAPI();
  }

  handleSlideMove(e, direction) {
    e.preventDefault();

    switch (direction) {
      case 'left':
        if(this.state.currentSlideSet === 0) {
          return;
        }
        else{
          this.setState(() => {
            return {currentSlideSet: this.state.currentSlideSet - 1}
          });
          scrollTo(document.getElementsByClassName('hero-container')[this.props.id], 'left', 1);
        }
        break;
      case 'right':
        if(this.state.currentSlideSet === MAX_SLIDES - 1) {
          return;
        }
        else{
          this.setState(() => {
            return {currentSlideSet: this.state.currentSlideSet + 1}
          });
          scrollTo(document.getElementsByClassName('hero-container')[this.props.id], 'right', 1);
        }
        break;
      default:
    }
  }

  render() {
    let name;

    return(
      <div className='hero-titles'>
          {this.state.data !== null &&
            <div className='hero-container' style={{animation : "fadeIn 3s"}} >
              {this.state.currentSlideSet !== 0 &&
                <div className='nav-slide nav-prev'>
                  <i onClick={(e) => this.handleSlideMove(e, 'left')} className="material-icons">keyboard_arrow_left</i>
                </div>
              }
              {this.state.data.slice(0, MAX_SLIDES).map((title, index) => {
                //TODO Stupid fix for TheMovieDB - Remove when own API ready!!!
                if(this.props.type === 'movie') name = title.title;
                if(this.props.type === 'tv') name = title.name;
                return(
                  <HeroItem key={index} title={title.title} desc={title.overview} img={title.backdrop_path}/>
                );
              })}
              {this.state.currentSlideSet !== MAX_SLIDES - 1 &&
                <div className='nav-slide nav-next'>
                  <i onClick={(e) => this.handleSlideMove(e, 'right')} className="material-icons">keyboard_arrow_right</i>
                </div>
              }
            </div>
          }
      </div>
    );
  }
}

export default HeroList;
