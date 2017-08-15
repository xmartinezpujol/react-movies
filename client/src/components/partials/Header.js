import React from 'react';
import SearchBox from './SearchBox';
import Logo from './Logo';
import UserProfile from '../Profile/UserProfile';
import MainMenu from './MainMenu';

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<header id="header">
	      <Logo />
				<MainMenu handleRoute={() => this.props.doRouting()} />
	      <SearchBox />
	      <UserProfile userImg={this.props.user.img} userName={this.props.user.name} />
			</header>
		);
	}
}

export default Header;
