import React from 'react';
import TitleItem from '../TitleItem';
import * as listActions from '../../../actions/listActions';
import * as loadingActions from '../../../actions/loadingActions';
import {connect} from 'react-redux';
import Loader from '../../Loader';

const API_KEY = '3068f3a34eb23cadda9e625ea4e903bd';
const API_LANG = 'en-US';
const MAX_TITLES = 20;
const maxSlides = Math.trunc(((window.innerWidth - 30) / 195));
const maxSlideMoves = Math.trunc((MAX_TITLES / maxSlides)) + 1;

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

    this.handleSlideMove = this.handleSlideMove.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(listActions.fetchList(this.props.url, this.props.sort));
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
    const id = this.props.id;
    const list = this.props.list.list[id];
    const isFetching = this.props.list.isFetching;

    return(
        <div>
          {typeof(list) !== 'undefined' && !isFetching &&
          <div className='list-titles' style={{animation : "fadeIn 2s"}}>
            <h2>{this.props.title}</h2>
            <div className='list-container'>
              {this.state.currentSlideSet !== 0 &&
                <div className='nav-slide nav-prev'>
                  <i onClick={(e) => this.handleSlideMove(e, 'left')} className="material-icons">keyboard_arrow_left</i>
                </div>
              }
              {list.map((title, index) => {
                //TODO Stupid fix for TheMovieDB - Remove when own API ready!!!
                if(this.props.type === 'movie') name = title.title;
                if(this.props.type === 'tv') name = title.name;
                return(
                  <TitleItem key={index} id={title.id} title={name} votes={title.vote_average} desc={title.overview} img={title.poster_path}/>
                );
              })}
              {this.state.currentSlideSet !== maxSlideMoves - 1 &&
                <div className='nav-slide nav-next'>
                  <i onClick={(e) => this.handleSlideMove(e, 'right')} className="material-icons">keyboard_arrow_right</i>
                </div>
              }
          </div>
        </div>
        }
        {isFetching &&
          <div className='list-titles'>
            <Loader />
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {return {
  list: state.list,
  loading: state.loading
}};

export default connect(mapStateToProps)(TitleList);
