import React from 'react';

class HeroItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return(
      <div className='hero-item'>
        <div className='overlay'>
          <div className='hero-info'>
            <h2 className="hero-name">{this.props.title}</h2>
            <div className="desc">{this.props.desc}</div>
          </div>
        </div>
        <img src={`https://image.tmdb.org/t/p/w1400_and_h450_bestv2${this.props.img}`} className="hero-image" />
      </div>
    );
  }
}

export default HeroItem;
