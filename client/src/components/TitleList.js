import React from 'react';
import TitleItem from './TitleItem';

const API_KEY = '3068f3a34eb23cadda9e625ea4e903bd';
const MAX_TITLES = 20;
const maxSlides = Math.trunc(((window.innerWidth - 30) / 195));
const maxSlideMoves = Math.trunc((20 / maxSlides)) + 1;

//console.log(maxSlides);
//console.log(maxSlideMoves);

function scrollTo(element, direction, times) {
  if(times > 0){
    setTimeout(() => {
      if(direction === 'left'){
        element.scrollLeft -= 196;
      }
      if(direction === 'right'){
        element.scrollLeft += 196;
      }
      scrollTo(element, direction, times - 1);
    }, 35);
  }
}

class TitleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      currentSlideSet: 0
    };

    this.loadTitlesAPI = this.loadTitlesAPI.bind(this);
    this.handleSlideMove = this.handleSlideMove.bind(this);
  }

  loadTitlesAPI() {
    let url = `https://api.themoviedb.org/3/${this.props.url}?api_key=${API_KEY}${this.props.sort}`;
    fetch(url)
      .then(response => response.json())
      .then(res => {
        this.setState(() => { return {data: res.results }} );
        window.data = res.results;
        }
      )
      .catch((res) => {
        console.log('ERROR: No image from API!');
      });
  }

  componentWillMount() {
    this.loadTitlesAPI();
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
          scrollTo(document.getElementsByClassName('list-container')[this.props.id], 'left', maxSlides);
        }
        break;
      case 'right':
        if(this.state.currentSlideSet === maxSlideMoves - 1) {
          return;
        }
        else{
          this.setState(() => {
            return {currentSlideSet: this.state.currentSlideSet + 1}
          });
          scrollTo(document.getElementsByClassName('list-container')[this.props.id], 'right', maxSlides);
        }
        break;
      default:
    }
  }

  render() {
    let name;

    return(
      <div className='list-titles'>
        <h2>{this.props.title}</h2>
        <div className='list-container'>
          {this.state.data === null &&
            <p>Loading...</p>
          }
          {this.state.currentSlideSet !== 0 &&
            <div className='nav-slide nav-prev'>
              <i onClick={(e) => this.handleSlideMove(e, 'left')} className="material-icons">keyboard_arrow_left</i>
            </div>
          }
          {this.state.data !== null &&
            this.state.data.map((title, index) => {
              //TODO Stupid fix for TheMovieDB - Remove when own API ready!!!
              if(this.props.type === 'movie') name = title.title;
              if(this.props.type === 'tv') name = title.name;
              return(
                <TitleItem key={index} title={name} votes={title.vote_average} desc={title.overview} img={title.poster_path}/>
              );
          })}
          <div className='nav-slide nav-next'>
            <i onClick={(e) => this.handleSlideMove(e, 'right')} className="material-icons">keyboard_arrow_right</i>
          </div>
        </div>
      </div>
    );
  }
}

export default TitleList;
