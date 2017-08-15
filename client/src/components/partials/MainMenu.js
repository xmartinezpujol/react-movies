import React from 'react';
import { Link } from 'react-router-dom';

class MainMenu extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    return(
      <div className="menu-main container">
        <nav>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/movies/1'>Movies</Link></li>
            <li><Link to='/tv'>TV Shows</Link></li>
            <li><Link to='/people'>People</Link></li>
            <li><Link to='/favorites'>Favorites</Link></li>
            <li><Link to='/watchlist'>Watchlist</Link></li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default MainMenu;
