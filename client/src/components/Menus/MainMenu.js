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
            <li><Link to='/profile'>Profile</Link></li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default MainMenu;
