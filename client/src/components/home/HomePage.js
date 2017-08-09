import React from 'react';
import HeroList from './containers/HeroList';
import TitleList from './containers/TitleList';
import GenresMenu from '../presentationals/GenresMenu';
import Settings from '../Profile/Settings';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const user = this.props.user;
    const genres = this.props.genres;

    return(
      <div id='home-page'>
        {typeof(user) !== 'undefined' && typeof(genres) !== 'undefined' &&
          <div className='page'>
            <HeroList key={'hero'+0} id={0} type="movie" url="discover/movie" sort="&sort_by=popularity.desc&page=1" />
            <GenresMenu genres={genres}/>
            <TitleList key={'titlelist'+0} id={0} type="movie" title={`Top Movies picks for ${user.name}`} url="discover/movie" sort="&sort_by=popularity.desc&page=1" />
            <TitleList key={'titlelist'+1} id={1} type="tv" title={`Top TV picks for ${user.name}`} url="discover/tv" sort="&sort_by=popularity.desc&page=1" />
            {user.fav_genres.map((genrelist, index) => {
              let viewgenre = genres.filter((genre) => {
                return genre.name === genrelist
              })
              return (
                <TitleList key={'titlelist'+ index + 2} id={index + 2} type="movie" title={genrelist} url="discover/movie" sort={`&sort_by=vote_average.desc&vote_count.gte=10&with_genres=${viewgenre[0].id}`} />
              );
            })}
          </div>
        }
      </div>
    );
  }
}

export default HomePage;
