import React from 'react';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return(
      <div className='user-profile'>
        <p>{this.props.userName}</p>
        <img src={this.props.userImg} className="user-avatar" />
      </div>
    );
  }
}

export default UserProfile;
