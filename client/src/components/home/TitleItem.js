import React from 'react';
import { Link } from 'react-router-dom';

class TitleItem extends React.Component {
  render() {
    return(
      <div>
        <Link to={`/movie/${this.props.id}`}>
          <div className='title-item'>
            <div className='overlay'>
              <p className="title-name">{this.props.title}</p>
              <p className="title-votes">{this.props.votes} ★</p>
              <div className="desc">{this.props.desc}</div>
            </div>
            <img src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2${this.props.img}`} className="title-image" />
          </div>
        </Link>
      </div>
    );
  }
}

export default TitleItem;
