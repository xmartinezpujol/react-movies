import React from 'react';
import VideosItem from './VideosItem';

class VideosList extends React.Component {
  render() {
    return(
      <div className='videos-list'>
        {this.props.videos.map((video, index) => {
          return(
            <VideosItem key={index} video={video} />
          );
        })}
      </div>
    );
  }
}

export default VideosList;
