import React from 'react';

const sampleUser = {
  name: 'Xavier',
  img: 'https://secure.gravatar.com/avatar/170393619042fee71496c35beddc5952.jpg',
  fav_genres: ['Adventure', 'Animation', 'Comedy', 'Fantasy', 'Science Fiction']
}

class FavoritesGenresList extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    return(
      <div className="favorites-genres">
        <h2>Favorite Genres for {sampleUser.name}</h2>
        <ul>
          {sampleUser.fav_genres !== null && sampleUser.fav_genres.map((genre, index) => {
             return(
               <a key={index} href="#"><li key={index}>{genre}</li></a>
             );
          })}
        </ul>
      </div>
    );
  }
}

export default FavoritesGenresList;
