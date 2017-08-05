import React from 'react';
import Header from './Header';
import TitleList from './TitleList';

const API_KEY = '3068f3a34eb23cadda9e625ea4e903bd';

const sampleUser = {
  name: 'Xavier',
  img: 'https://secure.gravatar.com/avatar/170393619042fee71496c35beddc5952.jpg'
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return(
      <div>
        <Header user={sampleUser}/>
        <TitleList id={0} type="movie" title={`Top Movies picks for ${sampleUser.name}`} url="discover/movie" sort="&sort_by=popularity.desc&page=1" />
        <TitleList id={1} type="tv" title={`Top TV picks for ${sampleUser.name}`} url="discover/tv" sort="&sort_by=popularity.desc&page=1" />
      </div>
    );
  }
}

export default App;
