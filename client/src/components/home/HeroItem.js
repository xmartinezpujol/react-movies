import React from 'react';

const HeroItem = (props) => {
  return(
    <div className='hero-item'>
      <div className='overlay'>
        <div className='hero-info'>
          <h2 className="hero-name">{props.title}</h2>
          <div className="desc">{props.desc}</div>
        </div>
      </div>
      <img src={`https://image.tmdb.org/t/p/w1400_and_h450_bestv2${props.img}`} className="hero-image" />
    </div>
  );
}

export default HeroItem;
