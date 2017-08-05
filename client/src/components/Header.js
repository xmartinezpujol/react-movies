import React from 'react';
import SearchBox from './SearchBox';
import Logo from './Logo';

const Header = (props) => {
	return (
		<header id="header">
      <Logo />
      <SearchBox />
		</header>
	);
}

export default Header;
