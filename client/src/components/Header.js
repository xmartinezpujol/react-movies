import React from 'react';
import SearchBox from './SearchBox';
import Logo from './Logo';
import UserProfile from './UserProfile';

const Header = (props) => {
	return (
		<header id="header">
      <Logo />
      <SearchBox />
      <UserProfile userImg={props.user.img} userName={props.user.name} />
		</header>
	);
}

export default Header;
