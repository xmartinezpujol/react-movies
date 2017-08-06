import React from 'react';
import Header from './Header';
import TitleList from './TitleList';

const API_KEY = '3068f3a34eb23cadda9e625ea4e903bd';
const API_LANG = 'en-US';

const sampleUser = {
  name: 'Xavier',
  img: 'https://secure.gravatar.com/avatar/170393619042fee71496c35beddc5952.jpg',
  fav_genres: ['Adventure', 'Animation', 'Comedy', 'Fantasy', 'Science Fiction']
}

let viewgenre;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: null
    };

    this.getMovieGenresID = this.getMovieGenresID.bind(this);
  }

  getMovieGenresID() {
    let url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=${API_LANG}`;
    fetch(url)
      .then(response => response.json())
      .then(res => {
        this.setState(() => { return {genres: res.genres }} );
        window.genres = res.genres;
        }
      )
      .catch((res) => {
        console.log('ERROR: No image from API!');
      });
  }

  componentWillMount() {
    this.getMovieGenresID();
  }

  render() {
    const { genres } = this.state;
    return(
      <div>
        <Header user={sampleUser}/>
        <TitleList key={0} id={0} type="movie" title={`Top Movies picks for ${sampleUser.name}`} url="discover/movie" sort="&sort_by=popularity.desc&page=1" />
        <TitleList key={1} id={1} type="tv" title={`Top TV picks for ${sampleUser.name}`} url="discover/tv" sort="&sort_by=popularity.desc&page=1" />
        {this.state.genres !== null && sampleUser.fav_genres.map((genrelist, index) => {
          let viewgenre = genres.filter((genre) => {
            //console.log(genrelist);
            return genre.name === genrelist
          })
          return (
            <TitleList key={index + 2} id={index + 2} type="movie" title={genrelist} url="discover/movie" sort={`&sort_by=vote_average.desc&vote_count.gte=10&with_genres=${viewgenre[0].id}`} />
          );
        })}
      </div>
    );
  }
}

export default App;
