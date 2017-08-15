import React from 'react';

const VideosItem = (props) => {
  return(
    <div className='video-item'>
      <iframe width="560" height="310" src={`https://www.youtube.com/embed/${props.video.key}`} frameBorder="0" allowFullScreen></iframe>
    </div>
  );
}

export default VideosItem;
