import React from 'react';
import FavoritesGenresList from '../Lists/FavoritesGenresList';

class Settings extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    return(
      <div className="profile-settings container">
        <h1 >Profile Page Ready</h1>
        <FavoritesGenresList />
      </div>
    );
  }
}

export default Settings;
